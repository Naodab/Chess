package com.example.pbl4Version1.mapper;

import org.springframework.stereotype.Component;

import com.example.pbl4Version1.dto.request.StepRequest;
import com.example.pbl4Version1.dto.response.StepResponse;
import com.example.pbl4Version1.entity.Step;

@Component
public class StepMapper {
	public Step toStep(StepRequest request) {
		return Step.builder()
				.from(request.getFrom())
				.to(request.getTo())
				.thTime(request.getThTime())
				.build();
	}
	
	public StepResponse toStepResponse(Step step) {
		return StepResponse.builder()
				.from(step.getFrom())
				.to(step.getTo())
				.thTime(step.getThTime())
				.matchId(step.getMatch().getId())
				.build();
	}
}
