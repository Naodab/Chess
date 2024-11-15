package com.example.pbl4Version1.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.example.pbl4Version1.dto.request.JoinRoomRequest;
import com.example.pbl4Version1.entity.RoomUser;
import com.example.pbl4Version1.enums.Mode;
import com.example.pbl4Version1.repository.RoomUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.pbl4Version1.dto.request.RoomCreateRequest;
import com.example.pbl4Version1.dto.request.RoomUpdateRequest;
import com.example.pbl4Version1.dto.response.RoomResponse;
import com.example.pbl4Version1.entity.Room;
import com.example.pbl4Version1.entity.User;
import com.example.pbl4Version1.exception.AppException;
import com.example.pbl4Version1.exception.ErrorCode;
import com.example.pbl4Version1.mapper.RoomMapper;
import com.example.pbl4Version1.repository.RoomRepository;
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
		if (request.getPassword() != null)
			room.setPassword(passwordEncoder.encode(request.getPassword()));
		room = roomRepository.save(room);
		var authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();
		User host = userRepository
				.findByUsername(username).orElseThrow(
						() -> new AppException(ErrorCode.USER_NOT_EXISTED));
		log.info(host.getId() + "/" + host.getUsername());
		RoomUser roomUser = RoomUser.builder()
				.user(host)
				.room(room)
				.role(Mode.HOST)
				.build();
		roomUserRepository.save(roomUser);
		Set<RoomUser> roomUsers = new HashSet<>();
		roomUsers.add(roomUser);
		room.setRoomUsers(roomUsers);
		return roomMapper.toRoomResponse(room);
	}
	
	public List<RoomResponse> getAll() {
		return roomRepository.findAllWithUsers()
				.stream()
				.map(roomMapper::toRoomResponse)
				.toList();
	}

	public List<RoomResponse> getAllActive() {
		return roomRepository.findAllByActive(true)
				.stream()
				.map(room -> {
					Set<RoomUser> roomUsers =
							new HashSet<>(roomUserRepository.findByRoomId(room.getId()));
					room.setRoomUsers(roomUsers);
					return roomMapper.toRoomResponse(room);
				})
				.toList();
	}
	
	public RoomResponse getRoom(Long id) {
		Room room = roomRepository.findById(id).orElseThrow(
				() -> new AppException(ErrorCode.ROOM_NOT_EXISTED));
		return roomMapper.toRoomResponse(room);
	}
	
	public RoomResponse update(Long id, RoomUpdateRequest request) {
		Room room = roomRepository.findById(id).orElseThrow(
				() -> new AppException(ErrorCode.ROOM_NOT_EXISTED));
		Set<RoomUser> roomUsers = room.getRoomUsers();
		//Set<User> viewers = new HashSet<>();
		User host = userRepository.findById(request.getHostId())
				.orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
		roomUsers.add(RoomUser.builder().room(room).user(host).role(Mode.HOST).build());

		if (request.getPlayerId() != null) {
			User player = userRepository.findById(request.getPlayerId())
					.orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
			roomUsers.add(RoomUser.builder().room(room).user(player).role(Mode.PLAYER).build());
		}
		if (request.getViewerIds() != null) {
			for (String viwerId: request.getViewerIds()) {
				User viewer = userRepository.findById(viwerId)
						.orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
				roomUsers.add(RoomUser.builder().room(room).user(viewer).role(Mode.VIEWER).build());
			}
		}
		room.setRoomUsers(roomUsers);
		room = roomRepository.save(room);
		roomUserRepository.saveAll(roomUsers);
		return roomMapper.toRoomResponse(room);
	}

	public void joinRoom(Long id, JoinRoomRequest request) {
		Room room = roomRepository.findById(id).orElseThrow(
				() -> new AppException(ErrorCode.ROOM_NOT_EXISTED));
		var authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();
		User user = userRepository.findByUsername(username)
						.orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
		log.info(user.getId() + "/" + user.getUsername());
		RoomUser roomUser;
		if (request.getRole().equals(Mode.PLAYER.toString())) {
			roomUser = RoomUser.builder()
							.user(user)
							.room(room)
							.role(Mode.PLAYER).build();
		}
		else {
			roomUser = RoomUser.builder()
							.user(user)
							.room(room)
							.role(Mode.VIEWER)
							.build();
		}
		roomUserRepository.save(roomUser);

		//update room when a new user comes in!
	}
	
	public void deleteRoom(Long id) {
		roomRepository.deleteById(id);
	}
	
	public int getPlayerCount(Long id) {
		Room room = roomRepository.findById(id).orElseThrow(
				() -> new AppException(ErrorCode.ROOM_NOT_EXISTED));
		return (int)room.getRoomUsers().stream().filter(user -> user.getRole() == Mode.PLAYER).count();
	}
	
	public int getViewerCount(Long id) {
		Room room = roomRepository.findById(id).orElseThrow(
				() -> new AppException(ErrorCode.ROOM_NOT_EXISTED));
		return (int)room.getRoomUsers().stream().filter(user -> user.getRole() == Mode.VIEWER).count();
	}
}
