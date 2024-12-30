package com.example.pbl4Version1.mapper;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.pbl4Version1.dto.request.UserCreateRequest;
import com.example.pbl4Version1.dto.request.UserUpdateRequest;
import com.example.pbl4Version1.dto.response.AchievementResponse;
import com.example.pbl4Version1.dto.response.UserResponse;
import com.example.pbl4Version1.entity.User;
import com.example.pbl4Version1.enums.Rank;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class UserMapper {
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
        Set<AchievementResponse> achievements = null;
        if (user.getAchievements() != null) {
            achievements = new HashSet<>(user.getAchievements().stream()
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
                .active(user.isActive())
                .achievements(achievements)
                .percent(
                        user.getBattleNumber() != 0
                                ? (int) ((float) user.getWinNumber() / (float) user.getBattleNumber() * 100)
                                : 0)
                .rank(rank)
                .latestLogin(user.getLatestLogin())
                .createDate(user.getCreateDate())
                .avatar(user.getAvatar())
                .build();
    }

    public User updateUser(User user, UserUpdateRequest request) {
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setElo(request.getElo());
        return user;
    }
}
