package com.example.pbl4Version1.mapper;

import org.springframework.stereotype.Component;

import com.example.pbl4Version1.dto.request.AchievementRequest;
import com.example.pbl4Version1.dto.response.AchievementResponse;
import com.example.pbl4Version1.entity.Achievement;

@Component
public class AchievementMapper {
    public Achievement toAchievement(AchievementRequest request) {
        return Achievement.builder()
                .name(request.getName())
                .url(request.getUrl())
                .description(request.getDespcription())
                .build();
    }

    public AchievementResponse toAchievementResponse(Achievement achievement) {
        return AchievementResponse.builder()
                .name(achievement.getName())
                .url(achievement.getUrl())
                .despcription(achievement.getDescription())
                .build();
    }
}
