package com.example.pbl4Version1.mapper;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.pbl4Version1.dto.request.UserCreateRequest;
import com.example.pbl4Version1.dto.request.UserUpdateRequest;
import com.example.pbl4Version1.dto.response.AchievementResponse;
import com.example.pbl4Version1.dto.response.RoleResponse;
import com.example.pbl4Version1.dto.response.UserResponse;
import com.example.pbl4Version1.entity.Achievement;
import com.example.pbl4Version1.entity.User;
	
@Component
public class UserMapper {
	@Autowired
	RoleMapper roleMapper;
	@Autowired
	AchievementMapper achievementMapper;
	
	public User toUser(UserCreateRequest request) {
		return User.builder()
				.username(request.getUsername())
				.password(request.getPassword())
				.dob(request.getDob())
				.email(request.getEmail())
				.name(request.getName())
				.build();
	}

	public UserResponse toUserResponse(User user) {
		Set<RoleResponse> roles = null;
		if (user.getRoles() != null) {
			roles = new HashSet<RoleResponse>(user.getRoles()
					.stream()
					.map(roleMapper::toRoleResponse)
					.toList());
		}
		
		Set<AchievementResponse> achievements = null;
		if (user.getAchievements() != null) {
			achievements = new HashSet<AchievementResponse>(user.getAchievements()
					.stream()
					.map(achievementMapper::toAchievementResponse)
					.toList());
		}
		
		var rank = user.getRank().getName();
		
		return UserResponse.builder()
				.id(user.getId())
				.email(user.getEmail())
				.username(user.getUsername())
				.name(user.getName())
				.dob(user.getDob())
				.elo(user.getElo())
				.battleNumber(user.getBattleNumber())
				.winNumber(user.getWinNumber())
				.drawNumber(user.getDrawNumber())
				.roles(roles)
				.achievements(achievements)
				.rank(rank)
				.build();
	}

	public User updateUser(User user, UserUpdateRequest request) {
		user.setEmail(request.getEmail());
		user.setPassword(request.getPassword());
		user.setName(request.getName());
		user.setDob(request.getDob());
		user.setElo(request.getElo());
		return user;
	}
}