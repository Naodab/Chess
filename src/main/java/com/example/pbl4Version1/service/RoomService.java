package com.example.pbl4Version1.service;

import java.util.*;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.pbl4Version1.dto.request.*;
import com.example.pbl4Version1.dto.response.RoomResponse;
import com.example.pbl4Version1.entity.Room;
import com.example.pbl4Version1.entity.RoomUser;
import com.example.pbl4Version1.entity.User;
import com.example.pbl4Version1.enums.Mode;
import com.example.pbl4Version1.exception.AppException;
import com.example.pbl4Version1.exception.ErrorCode;
import com.example.pbl4Version1.mapper.RoomMapper;
import com.example.pbl4Version1.repository.RoomRepository;
import com.example.pbl4Version1.repository.RoomUserRepository;
import com.example.pbl4Version1.repository.UserRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RoomService {
    UserRepository userRepository;
    RoomRepository roomRepository;
    RoomUserRepository roomUserRepository;
    PasswordEncoder passwordEncoder;
    RoomMapper roomMapper;

    public RoomResponse create(RoomCreateRequest request) {
        Room room = roomMapper.toRoom(request);
        if (request.getPassword() != null) room.setPassword(passwordEncoder.encode(request.getPassword()));
        room = roomRepository.save(room);
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User host =
                userRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        RoomUser roomUser =
                RoomUser.builder().user(host).room(room).role(Mode.HOST).build();
        roomUserRepository.save(roomUser);
        Set<RoomUser> roomUsers = new HashSet<>();
        roomUsers.add(roomUser);
        room.setRoomUsers(roomUsers);
        return roomMapper.toRoomResponse(room);
    }

    public RoomResponse autoCreate(RoomAutoCreateRequest request) {
        Room room = roomMapper.toRoom(request);
        if (request.getPassword() != null) room.setPassword(passwordEncoder.encode(request.getPassword()));
        room = roomRepository.save(room);
        User host = userRepository
                .findByUsername(request.getHostUsername())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        RoomUser roomUser =
                RoomUser.builder().user(host).room(room).role(Mode.HOST).build();
        roomUserRepository.save(roomUser);
        Set<RoomUser> roomUsers = new HashSet<>();
        roomUsers.add(roomUser);
        room.setRoomUsers(roomUsers);
        return roomMapper.toRoomResponse(room);
    }

    public List<RoomResponse> getAll() {
        return roomRepository.findAllWithUsers().stream()
                .map(roomMapper::toRoomResponse)
                .toList();
    }

    public List<RoomResponse> getAllActive() {
        return roomRepository.findAllByActive(true).stream()
                .map(room -> {
                    Set<RoomUser> roomUsers = new HashSet<>(roomUserRepository.findByRoomId(room.getId()));
                    room.setRoomUsers(roomUsers);
                    return roomMapper.toRoomResponse(room);
                })
                .toList();
    }

    public RoomResponse getRoom(Long id) {
        Room room = roomRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_EXISTED));
        List<RoomUser> roomUsers = roomUserRepository.findByRoomId(id);
        room.setRoomUsers(new HashSet<>(roomUsers));
        return roomMapper.toRoomResponse(room);
    }

    public RoomResponse update(Long id, RoomUpdateRequest request) {
        Room room = roomRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_EXISTED));
        Set<RoomUser> roomUsers = room.getRoomUsers();
        // Set<User> viewers = new HashSet<>();
        User host = userRepository
                .findById(request.getHostId())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        roomUsers.add(RoomUser.builder().room(room).user(host).role(Mode.HOST).build());

        if (request.getPlayerId() != null) {
            User player = userRepository
                    .findById(request.getPlayerId())
                    .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
            roomUsers.add(
                    RoomUser.builder().room(room).user(player).role(Mode.PLAYER).build());
        }
        if (request.getViewerIds() != null) {
            for (String viwerId : request.getViewerIds()) {
                User viewer = userRepository
                        .findById(viwerId)
                        .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
                roomUsers.add(RoomUser.builder()
                        .room(room)
                        .user(viewer)
                        .role(Mode.VIEWER)
                        .build());
            }
        }
        room.setRoomUsers(roomUsers);
        room = roomRepository.save(room);
        roomUserRepository.saveAll(roomUsers);
        return roomMapper.toRoomResponse(room);
    }

    public RoomResponse joinRoom(Long id, JoinRoomRequest request) {
        Room room = roomRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_EXISTED));
        if (room.getPassword() != null && !passwordEncoder.matches(request.getPassword(), room.getPassword())) {
            throw new AppException(ErrorCode.PASSWORD_NOT_MATCH);
        }
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return joinRoomSupport(room, request, username);
    }

    public RoomResponse joinRoom(Long id, JoinRoomRequest request, String username) {
        Room room = roomRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_EXISTED));
        return joinRoomSupport(room, request, username);
    }

    public RoomResponse joinRoomSupport(Room room, JoinRoomRequest request, String username) {
        User user =
                userRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        boolean isHavingPlayer = false;
        List<RoomUser> roomUsers = roomUserRepository.findByRoomId(room.getId());
        RoomUser roomUser;
        if (roomUsers != null) {
            for (RoomUser roomuser : roomUsers) {
                if (roomuser.getRole() == Mode.PLAYER) {
                    isHavingPlayer = true;
                    break;
                }
            }
        }
        if (request.getRole().equals(Mode.PLAYER.name())) {
            if (!isHavingPlayer) {
                roomUser = RoomUser.builder()
                        .user(user)
                        .room(room)
                        .role(Mode.PLAYER)
                        .build();
            } else throw new AppException(ErrorCode.ROOM_HAD_PLAYER);
        } else {
            roomUser =
                    RoomUser.builder().user(user).room(room).role(Mode.VIEWER).build();
        }
        roomUserRepository.save(roomUser);
        if (roomUsers != null) roomUsers = new ArrayList<>();
        roomUsers.add(roomUser);
        room.setRoomUsers(new HashSet<>(roomUsers));
        return roomMapper.toRoomResponse(room);
    }

    public void leaveRoom(Long id) {
        Room room = roomRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_EXISTED));
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user =
                userRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        List<RoomUser> roomUsers = roomUserRepository.findByRoomId(id);
        RoomUser roomUserToRemove = null;
        for (RoomUser roomUser : roomUsers) {
            if (roomUser.getUser().getId().equals(user.getId())) {
                roomUserToRemove = roomUser;
                break;
            }
        }
        switch (roomUserToRemove.getRole()) {
            case PLAYER:
            case VIEWER:
                roomUsers.remove(roomUserToRemove);
                break;
                //			case PLAYER:
                //				RoomUser newPlayer = roomUsers.stream().filter(ru -> ru.getRole()
                //						.equals(Mode.VIEWER)).findFirst().orElse(null);
                //				if (newPlayer != null) {
                //					newPlayer.setRole(Mode.PLAYER);
                //					roomUserRepository.save(newPlayer);
                //				} else {
                //					//don't have a viewer when player leaves!
                //				}
                //				break;
            case HOST:
                //				RoomUser newHost = roomUsers.stream().filter(ru -> ru.getRole()
                //						.equals(Mode.PLAYER)).findFirst().orElse(null);
                //				if (newHost != null) {
                //					newHost.setRole(Mode.HOST);
                //					roomUserRepository.save(newHost);
                //					RoomUser newPlayer2 = roomUsers.stream().filter(ru -> ru.getRole()
                //							.equals(Mode.VIEWER)).findFirst().orElse(null);
                //					if (newPlayer2 != null) {
                //						newPlayer2.setRole(Mode.PLAYER);
                //						roomUserRepository.save(newPlayer2);
                //					} else {
                //						//don't have a viewer when player leaves!
                //
                //					}
                //				} else {
                //					//don't have a player when host leaves!
                //
                //				}
                //				break;
                List<RoomUser> listToRemove = roomUserRepository.findByRoomId(id);
                for (RoomUser roomUser : listToRemove) {
                    if (!roomUser.getUser().getId().equals(user.getId())) {
                        roomUserRepository.deleteByRoomIdAndUserId(
                                room.getId(), roomUser.getUser().getId());
                    }
                }
                break;
        }
        roomUserRepository.deleteByRoomIdAndUserId(room.getId(), user.getId());
        if (roomUsers != null) roomUsers = new ArrayList<>();
        room.setRoomUsers(new HashSet<>(roomUsers));
    }

    public RoomResponse leaveRoom(Long id, String username) {
        Room room = roomRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_EXISTED));
        List<RoomUser> roomUsers = roomUserRepository.findByRoomId(id);
        RoomUser roomUserToRemove = null;
        for (RoomUser roomUser : roomUsers) {
            if (roomUser.getUser().getUsername().equals(username)) {
                roomUserToRemove = roomUser;
                break;
            }
        }
        if (roomUserToRemove == null) return roomMapper.toRoomResponse(room);
        if (Objects.requireNonNull(roomUserToRemove.getRole()) == Mode.HOST) {
            boolean isPlayerExists = false;
            for (RoomUser roomUser : roomUsers) {
                if (roomUser.getRole().equals(Mode.PLAYER)) {
                    roomUser.setRole(Mode.HOST);
                    roomUserRepository.save(roomUser);
                    isPlayerExists = true;
                    break;
                }
            }
            if (!isPlayerExists) {
                room.setActive(false);
                roomRepository.save(room);
            }
        }
        roomUsers.remove(roomUserToRemove);
        roomUserRepository.delete(roomUserToRemove);
        room.setRoomUsers(new HashSet<>(roomUsers));
        return roomMapper.toRoomResponse(room);
    }

    public void deleteRoom(Long id) {
        roomRepository.deleteById(id);
    }
}
