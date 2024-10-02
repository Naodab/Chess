package com.example.pbl4Version1.service;

import java.util.HashSet;
import java.util.List;

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
	PasswordEncoder passwordEncoder;
	RoomMapper roomMapper;
	
	public RoomResponse create(RoomCreateRequest request) {
		Room room = roomMapper.toRoom(request);
		room.setHost(userRepository
				.findById(request.getHostId()).orElseThrow(
							() -> new AppException(ErrorCode.USER_NOT_EXISTED)));
		if (request.getPassword() != null)
			room.setPassword(passwordEncoder.encode(request.getPassword()));
		room = roomRepository.save(room);
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
				() -> new AppException(ErrorCode.ROOM_NOTEXISTED));
		return roomMapper.toRoomResponse(room);
	}
	
	public RoomResponse update(Long id, RoomUpdateRequest request) {
		Room room = roomRepository.findById(id).orElseThrow(
				() -> new AppException(ErrorCode.ROOM_NOTEXISTED));
		room.setHost(userRepository
				.findById(request.getHostId()).orElseThrow(
							() -> new AppException(ErrorCode.USER_NOT_EXISTED)));
		if (request.getPlayerId() != null) {
			room.setPlayer(userRepository
					.findById(request.getPlayerId()).orElseThrow(
						() -> new AppException(ErrorCode.USER_NOT_EXISTED)));
		}
		if (request.getViewerIds() != null) {
			room.setViewers(new HashSet<User>(userRepository
					.findAllById(request.getViewerIds())));
		}
		room = roomRepository.save(room);
		return roomMapper.toRoomResponse(room);
	}
	
	public void deleteRoom(Long id) {
		roomRepository.deleteById(id);
	}
}
