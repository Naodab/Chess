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
import com.example.pbl4Version1.entity.User;
import com.example.pbl4Version1.enums.Rank;
	
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
				.email(request.getEmail())
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
		
		String rank = Rank.getRank(user.getElo()).getName();
		
		return UserResponse.builder()
				.id(user.getId())
				.email(user.getEmail())
				.username(user.getUsername())
				.elo(user.getElo())
				.battleNumber(user.getBattleNumber())
				.winNumber(user.getWinNumber())
				.drawNumber(user.getDrawNumber())
				.roles(roles)
				.achievements(achievements)
				.rank(rank)
				.latestLogin(user.getLatestLogin())
				.createDate(user.getCreateDate())
				.build();
	}

	public User updateUser(User user, UserUpdateRequest request) {
		user.setEmail(request.getEmail());
		user.setPassword(request.getPassword());
		user.setElo(request.getElo());
		return user;
	}
}