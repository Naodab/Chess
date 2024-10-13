package com.example.pbl4Version1.mapper;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.pbl4Version1.dto.request.MatchBotCreationRequest;
import com.example.pbl4Version1.dto.request.MatchCreationRequest;
import com.example.pbl4Version1.dto.response.MatchWithBotResponse;
import com.example.pbl4Version1.dto.response.MatchWithHumanResponse;
import com.example.pbl4Version1.dto.response.StepResponse;
import com.example.pbl4Version1.entity.MatchWithBot;
import com.example.pbl4Version1.entity.MatchWithHuman;

@Component
public class MatchMapper {
	@Autowired
	StepMapper stepMapper;
	
	@Autowired
	UserMapper userMapper;
	
	@Autowired
	RoomMapper roomMapper;
	
	public MatchWithHuman toMatchWithHuman(MatchCreationRequest request) {
		return new MatchWithHuman();
	}
	
	public MatchWithBot toMatchWithBot(MatchBotCreationRequest request) {
		return new MatchWithBot();
	}
	
	public MatchWithBotResponse toMatchWithBotResponse(MatchWithBot match) {
		Set<StepResponse> steps = new HashSet<StepResponse>();
		if (match.getSteps() != null) {
			match.getSteps().stream()
				.map(stepMapper::toStepResponse)
				.forEach(steps::add);
		}
		
		String winner = null;
		if (match.getWinner() != null) {
			winner = match.getWinner().name();
		}
		
		return MatchWithBotResponse.builder()
				.steps(steps)
				.winner(winner)
				.player(userMapper.toUserResponse(match.getPlayer()))
				.id(match.getId())
				.build();
	}
	
	public MatchWithHumanResponse toMatchWithHumanResponse(MatchWithHuman match) {
		Set<StepResponse> steps = new HashSet<StepResponse>();
		if (match.getSteps() != null) {
			match.getSteps().stream()
				.map(stepMapper::toStepResponse)
				.forEach(steps::add);
		}
		
		String winner = null;
		if (match.getWinner() != null) {
			winner = match.getWinner().name();
		}
		
		return MatchWithHumanResponse.builder()
				.roomResponse(roomMapper.toRoomResponse(match.getRoom()))
				.black(userMapper.toUserResponse(match.getBlackPlayer()))
				.white(userMapper.toUserResponse(match.getWhitePlayer()))
				.id(match.getId())
				.steps(steps)
				.winner(winner)
				.build();
	}
}
