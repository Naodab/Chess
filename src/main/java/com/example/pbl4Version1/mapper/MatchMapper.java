package com.example.pbl4Version1.mapper;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.pbl4Version1.dto.request.MatchCreationRequest;
import com.example.pbl4Version1.dto.response.MatchResponse;
import com.example.pbl4Version1.dto.response.StepResponse;
import com.example.pbl4Version1.entity.Match;

@Component
public class MatchMapper {
	@Autowired
	StepMapper stepMapper;
	
	@Autowired
	UserMapper userMapper;
	
	@Autowired
	RoomMapper roomMapper;
	
	public Match toMatch(MatchCreationRequest request) {
		return Match.builder().build();
	}
	
	public MatchResponse toMatchResponse(Match match) {
		Set<StepResponse> steps = new HashSet<StepResponse>();
		if (match.getSteps() != null) {
			match.getSteps().stream()
				.map(stepMapper::toStepResponse)
				.forEach(steps::add);
		}
		
		return MatchResponse.builder()
				.roomResponse(roomMapper.toRoomResponse(match.getRoom()))
				.black(userMapper.toUserResponse(match.getBlackUser()))
				.white(userMapper.toUserResponse(match.getWhiteUser()))
				.id(match.getId())
				.steps(steps)
				.build();
	}
}
