package com.example.pbl4Version1.mapper;

import com.example.pbl4Version1.entity.MatchWithBot;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.pbl4Version1.dto.request.StepRequest;
import com.example.pbl4Version1.dto.request.StepToBotRequest;
import com.example.pbl4Version1.dto.response.StepResponse;
import com.example.pbl4Version1.entity.Step;

@Component
public class StepMapper {
	@Autowired
	MatchMapper matchMapper;

	public Step toStep(StepRequest request) {
		return Step.builder()
				.from(request.getFrom())
				.to(request.getTo())
				.boardState(request.getFen())
				.build();
	}
	
	public StepResponse toStepResponse(Step step) {
		return StepResponse.builder()
				.from(step.getFrom())
				.to(step.getTo())
				.match(matchMapper.toMatchWithBotResponse((MatchWithBot) step.getMatch()))
				.fen(step.getBoardState())
				.build();
	}
	
	public Step toStep(StepToBotRequest request) {
		return Step.builder()
				.boardState(request.getFen())
				.from(request.getFrom())
				.to(request.getTo())
				.build();
	}
}
