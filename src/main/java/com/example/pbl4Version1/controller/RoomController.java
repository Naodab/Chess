package com.example.pbl4Version1.controller;

import java.util.List;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.pbl4Version1.dto.request.RoomCreateRequest;
import com.example.pbl4Version1.dto.request.RoomUpdateRequest;
import com.example.pbl4Version1.dto.response.ApiResponse;
import com.example.pbl4Version1.dto.response.RoomResponse;
import com.example.pbl4Version1.service.RoomService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/rooms")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RoomController {
	RoomService roomService;
	
	@PostMapping
	ApiResponse<RoomResponse> create(@RequestBody RoomCreateRequest request) {
		log.info(request.getHostId() + "/" + request.getPassword());
		return ApiResponse.<RoomResponse>builder()
				.result(roomService.create(request))
				.build();
	}
	
	@GetMapping
	ApiResponse<List<RoomResponse>> getAll() {
		return ApiResponse.<List<RoomResponse>>builder()
				.result(roomService.getAllActive())
				.build();
	}

	@GetMapping("/active")
	ApiResponse<List<RoomResponse>> getAllActive() {
		return ApiResponse.<List<RoomResponse>>builder()
				.result(roomService.getAllActive())
				.build();
	}
	
	@GetMapping("/{roomId}")
	ApiResponse<RoomResponse> getRoom(@PathVariable("roomId") Long id) {
		return ApiResponse.<RoomResponse>builder()
				.result(roomService.getRoom(id))
				.build();
	}
	
	@PutMapping("/{roomId}")
	ApiResponse<RoomResponse> update(@PathVariable("roomId") Long id, 
			@RequestBody RoomUpdateRequest request) {
		return ApiResponse.<RoomResponse>builder()
				.result(roomService.update(id, request))
				.build();
	}
	
	@DeleteMapping("/{roomId}")
	ApiResponse<?> delete(@PathVariable("roomId") Long id) {
		roomService.deleteRoom(id);
		return ApiResponse.builder()
				.message("Room + " + id + " has been deleted.")
				.build();
	}

	@MessageMapping("/join-room")
	@SendTo("/topic/public")
	public String joinRoom() {
		return "abc join";
	}
}
