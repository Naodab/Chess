package com.example.pbl4Version1.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.example.pbl4Version1.dto.request.JoinRoomRequest;
import com.example.pbl4Version1.entity.RoomUser;
import com.example.pbl4Version1.enums.Mode;
import com.example.pbl4Version1.repository.RoomUserRepository;
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
		User host = userRepository
				.findById(request.getHostId()).orElseThrow(
						() -> new AppException(ErrorCode.USER_NOT_EXISTED));

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
		return roomRepository.findAll()
				.stream()
				.map(roomMapper::toRoomResponse)
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

	public RoomResponse joinRoom(Long id, JoinRoomRequest request) {
		Room room = roomRepository.findById(id).orElseThrow(
				() -> new AppException(ErrorCode.ROOM_NOT_EXISTED));

		User viewer = userRepository.findByUsername(request.getUsername())
				.orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
		room.getRoomUsers().add(RoomUser.builder().room(room).user(viewer).role(Mode.VIEWER).build());
		room = roomRepository.save(room);
		return roomMapper.toRoomResponse(room);
	}
	
	public void deleteRoom(Long id) {
		roomRepository.deleteById(id);
	}
}
