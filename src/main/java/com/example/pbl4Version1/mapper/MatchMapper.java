package com.example.pbl4Version1.mapper;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.pbl4Version1.dto.request.MatchBotCreationRequest;
import com.example.pbl4Version1.dto.request.MatchCreationRequest;
import com.example.pbl4Version1.dto.response.*;
import com.example.pbl4Version1.entity.MatchWithBot;
import com.example.pbl4Version1.entity.MatchWithHuman;

@Component
public class MatchMapper {
    @Autowired
    UserMapper userMapper;

    @Autowired
    RoomMapper roomMapper;

    @Autowired
    private StepMapper stepMapper;

    public MatchWithHuman toMatchWithHuman(MatchCreationRequest request) {
        return new MatchWithHuman();
    }

    public MatchWithBot toMatchWithBot(MatchBotCreationRequest request) {
        return new MatchWithBot();
    }

    public MatchWithBotResponse toMatchWithBotResponse(MatchWithBot match) {
        String winner = null;
        if (match.getWinner() != null) {
            winner = match.getWinner().name();
        }

        ArrayList<StepResponse> steps = new ArrayList<>();
        if (match.getSteps() != null) {
            steps.addAll(
                    match.getSteps().stream().map(stepMapper::toStepResponse).toList());
        }

        return MatchWithBotResponse.builder()
                .winner(winner)
                .player(userMapper.toUserResponse(match.getPlayer()))
                .steps(steps)
                .id(match.getId())
                .build();
    }

    public MatchWithHumanResponse toMatchWithHumanResponse(MatchWithHuman match) {
        String winner = null;
        if (match.getWinner() != null) {
            winner = match.getWinner().name();
        }

        ArrayList<StepResponse> steps = new ArrayList<>();
        if (match.getSteps() != null) {
            steps.addAll(
                    match.getSteps().stream().map(stepMapper::toStepResponse).toList());
        }

        return MatchWithHumanResponse.builder()
                .roomResponse(roomMapper.toRoomResponse(match.getRoom()))
                .black(userMapper.toUserResponse(match.getBlackPlayer()))
                .white(userMapper.toUserResponse(match.getWhitePlayer()))
                .timeBlack(match.getTimeBlackUser())
                .timeWhite(match.getTimeWhiteUser())
                .id(match.getId())
                .winner(winner)
                .steps(steps)
                .build();
    }

    public MatchWithHumanPageResponse toMatchWithHumanPageResponse(MatchWithHuman match) {
        String winner = null;
        if (match.getWinner() != null) {
            winner = match.getWinner().name();
        } else {
            winner = "Đang diễn ra";
        }
        return MatchWithHumanPageResponse.builder()
                .id(match.getId())
                .whiteUsername(match.getWhitePlayer().getUsername())
                .blackUsername(match.getBlackPlayer().getUsername())
                .time(match.getRoom().getTime())
                .winner(winner)
                .createdAt(match.getCreatedAt())
                .build();
    }
}
