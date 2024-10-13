package com.example.pbl4Version1.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.pbl4Version1.dto.request.MatchBotCreationRequest;
import com.example.pbl4Version1.dto.request.MatchCreationRequest;
import com.example.pbl4Version1.dto.response.MatchWithHumanResponse;
import com.example.pbl4Version1.entity.MatchWithHuman;
import com.example.pbl4Version1.entity.User;
import com.example.pbl4Version1.exception.AppException;
import com.example.pbl4Version1.exception.ErrorCode;
import com.example.pbl4Version1.mapper.MatchMapper;
import com.example.pbl4Version1.repository.MatchWithHumanRepository;
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
public class MatchWithHumanService {
	MatchWithHumanRepository matchRepository;
	UserRepository userRepository;
	RoomRepository roomRepository;
	MatchMapper matchMapper;
	
	public MatchWithHumanResponse create(MatchCreationRequest request) {
		MatchWithHuman match = matchMapper.toMatchWithHuman(request);
		
		match.setBlackPlayer(userRepository.findById(request.getBlackPlayerId())
				.orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED)));
		
		match.setWhitePlayer(userRepository.findById(request.getWhitePlayerId())
				.orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED)));
		
		match.setRoom(roomRepository.findById(request.getRoomId())
				.orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_EXISTED)));
		
		match = matchRepository.save(match);
		return matchMapper.toMatchWithHumanResponse(match);
	}
	
	public List<MatchWithHumanResponse> getAll() {
		return matchRepository.findAll()
				.stream()
				.map(matchMapper::toMatchWithHumanResponse)
				.toList();
	}
	
	public MatchWithHumanResponse getMatch(Long id) {
		MatchWithHuman match = matchRepository.findById(id)
				.orElseThrow(() -> new AppException(ErrorCode.MATCH_NOT_EXISTED));
		return matchMapper.toMatchWithHumanResponse(match);
	}
	
	public MatchWithHumanResponse playWithBot(MatchBotCreationRequest request) {
		User user = userRepository.findByUsername(request.getUsername())
				.orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
		MatchWithHuman match = new MatchWithHuman();
		match.setWhitePlayer(user);
		return null;
	}
	
//	public MatchResponse update(Long i)
}
