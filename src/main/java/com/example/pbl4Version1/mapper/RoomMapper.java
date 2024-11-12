package com.example.pbl4Version1.mapper;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.pbl4Version1.dto.request.RoomCreateRequest;
import com.example.pbl4Version1.dto.response.RoomResponse;
import com.example.pbl4Version1.dto.response.UserResponse;
import com.example.pbl4Version1.entity.Room;
import com.example.pbl4Version1.entity.RoomUser;
import com.example.pbl4Version1.entity.User;
import com.example.pbl4Version1.enums.Mode;

@Component
public class RoomMapper {
	@Autowired
	UserMapper userMapper;
	
	public Room toRoom(RoomCreateRequest request) {
		return Room.builder()
				.password(request.getPassword())
				.time(request.getTime())
				.build();
	}

	public RoomResponse toRoomResponse(Room room) {
		UserResponse player = null;
		UserResponse host = null;
		Set<UserResponse> viewers = new HashSet<UserResponse>();
		
		Set<RoomUser> users = room.getRoomUsers();
		if (users != null) {
			for (RoomUser roomUser : users) {
				if (roomUser.getRole() == Mode.HOST) {
					host = userMapper.toUserResponse(roomUser.getUser());
				}
				else if (roomUser.getRole() == Mode.PLAYER) {
					player = userMapper.toUserResponse(roomUser.getUser());
				}
				else if (roomUser.getRole() == Mode.VIEWER) {
					viewers.add(userMapper.toUserResponse(roomUser.getUser()));
				}
			}
		}
		
		return RoomResponse.builder()
				.id(room.getId())
				.host(host)
				.player(player)
				.time(room.getTime())
				.viewers(viewers)
				.playDay(room.getPlayDay())
				.build();
	}
}