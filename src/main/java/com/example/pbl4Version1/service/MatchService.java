package com.example.pbl4Version1.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.pbl4Version1.dto.request.MatchCreationRequest;
import com.example.pbl4Version1.dto.response.MatchResponse;
import com.example.pbl4Version1.entity.Match;
import com.example.pbl4Version1.exception.AppException;
import com.example.pbl4Version1.exception.ErrorCode;
import com.example.pbl4Version1.mapper.MatchMapper;
import com.example.pbl4Version1.repository.MatchRepository;
import com.example.pbl4Version1.repository.RoomRepository;
import com.example.pbl4Version1.repository.UserRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class MatchService {
	MatchRepository matchRepository;
	UserRepository userRepository;
	RoomRepository roomRepository;
	MatchMapper matchMapper;
	
	public MatchResponse create(MatchCreationRequest request) {
		Match match = matchMapper.toMatch(request);
		
		match.setBlackUser(userRepository.findById(request.getBlackUserId())
				.orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED)));
		
		match.setWhiteUser(userRepository.findById(request.getWhiteUserId())
				.orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED)));
		
		match.setRoom(roomRepository.findById(request.getRoomId())
				.orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_EXISTED)));
		
		match = matchRepository.save(match);
		return matchMapper.toMatchResponse(match);
	}
	
	public List<MatchResponse> getAll() {
		return matchRepository.findAll()
				.stream()
				.map(matchMapper::toMatchResponse)
				.toList();
	}
	
	public MatchResponse getMatch(Long id) {
		Match match = matchRepository.findById(id)
				.orElseThrow(() -> new AppException(ErrorCode.MATCH_NOT_EXISTED));
		return matchMapper.toMatchResponse(match);
	}
	
//	public MatchResponse update(Long i)
}
