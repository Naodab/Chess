package com.example.pbl4Version1.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.pbl4Version1.dto.request.AchievementRequest;
import com.example.pbl4Version1.dto.response.AchievementResponse;
import com.example.pbl4Version1.entity.Achievement;
import com.example.pbl4Version1.mapper.AchievementMapper;
import com.example.pbl4Version1.repository.AchievementRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AchievementService {
	AchievementRepository achievementRepository;
	AchievementMapper achievementMapper;
	
	public AchievementResponse create(AchievementRequest request) {
		Achievement achievement = achievementMapper.toAchievement(request);
		achievement = achievementRepository.save(achievement);
		return achievementMapper.toAchievementResponse(achievement);
	}
	
	public List<AchievementResponse> getAll() {
		return achievementRepository.findAll()
				.stream()
				.map(achievementMapper::toAchievementResponse)
				.toList();
	}
	
	public void delete(String name) {
		achievementRepository.deleteById(name);
	}
}
