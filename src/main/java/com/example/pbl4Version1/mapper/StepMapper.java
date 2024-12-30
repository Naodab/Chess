package com.example.pbl4Version1.mapper;

import org.springframework.stereotype.Component;

import com.example.pbl4Version1.dto.request.StepRequest;
import com.example.pbl4Version1.dto.request.StepToBotRequest;
import com.example.pbl4Version1.dto.response.StepResponse;
import com.example.pbl4Version1.entity.Step;

@Component
public class StepMapper {

    public Step toStep(StepRequest request) {
        return Step.builder()
                .from(request.getFrom())
                .to(request.getTo())
                .boardState(request.getFen())
                .name(request.getName())
                .build();
    }

    public StepResponse toStepResponse(Step step) {
        return StepResponse.builder()
                .from(step.getFrom())
                .to(step.getTo())
                .matchId(step.getMatch().getId())
                .fen(step.getBoardState())
                .name(step.getName())
                .build();
    }

    public Step toStep(StepToBotRequest request) {
        return Step.builder()
                .boardState(request.getFen())
                .from(request.getFrom())
                .to(request.getTo())
                .name(request.getName())
                .build();
    }
}
