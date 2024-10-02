package com.example.pbl4Version1.mapper;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.pbl4Version1.dto.request.RoomCreateRequest;
import com.example.pbl4Version1.dto.response.RoomResponse;
import com.example.pbl4Version1.dto.response.UserResponse;
import com.example.pbl4Version1.entity.Room;

@Component
public class RoomMapper {
	@Autowired
	UserMapper userMapper;
	
	public Room toRoom(RoomCreateRequest request) {
		return Room.builder()
				.password(request.getPassword())
				.build();
	}

	public RoomResponse toRoomResponse(Room room) {
		Set<UserResponse> viewers = new HashSet<UserResponse>();
		if (room.getViewers() != null) {
			room.getViewers().stream()
				.map(userMapper::toUserResponse)
				.forEach(viewers::add);
		}
		var host = userMapper.toUserResponse(room.getHost());
		UserResponse player = null;
		if (room.getPlayer() != null) {
			player = userMapper.toUserResponse(room.getPlayer());
		}
		return RoomResponse.builder()
				.id(room.getId())
				.host(host)
				.player(player)
				.viewers(viewers)
				.playDay(room.getPlayDay())
				.build();
	}
}