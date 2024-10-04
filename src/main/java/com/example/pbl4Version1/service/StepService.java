package com.example.pbl4Version1.service;

import org.springframework.stereotype.Service;

import com.example.pbl4Version1.dto.request.StepRequest;
import com.example.pbl4Version1.dto.response.StepResponse;
import com.example.pbl4Version1.entity.Match;
import com.example.pbl4Version1.entity.Step;
import com.example.pbl4Version1.exception.AppException;
import com.example.pbl4Version1.exception.ErrorCode;
import com.example.pbl4Version1.mapper.StepMapper;
import com.example.pbl4Version1.repository.MatchRepository;
import com.example.pbl4Version1.repository.StepRepisitory;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class StepService {
	StepRepisitory stepRepisitory;
	MatchRepository matchRepository;
	StepMapper stepMapper;
	
	public StepResponse create(StepRequest request) {
		Step step = stepMapper.toStep(request);
		Match match = matchRepository.findById(request.getMatchId()).orElseThrow(
				() -> new AppException(ErrorCode.MATCH_NOT_EXISTED));
		step.setMatch(match);
		step = stepRepisitory.save(step);
		return stepMapper.toStepResponse(step);
	}
}
