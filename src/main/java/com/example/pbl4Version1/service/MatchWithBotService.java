package com.example.pbl4Version1.service;

import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.example.pbl4Version1.dto.request.MatchBotCreationRequest;
import com.example.pbl4Version1.dto.response.MatchWithBotResponse;
import com.example.pbl4Version1.entity.MatchWithBot;
import com.example.pbl4Version1.entity.User;
import com.example.pbl4Version1.exception.AppException;
import com.example.pbl4Version1.exception.ErrorCode;
import com.example.pbl4Version1.mapper.MatchMapper;
import com.example.pbl4Version1.repository.MatchWithBotRepository;
import com.example.pbl4Version1.repository.UserRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class MatchWithBotService {
	MatchWithBotRepository matchRepository;
	UserRepository userRepository;
	MatchMapper matchMapper;
	
	public MatchWithBotResponse create(MatchBotCreationRequest request) {
		User player = userRepository.findByUsername(request.getUsername())
				.orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
		
		MatchWithBot match = matchMapper.toMatchWithBot(request);
		match.setPlayer(player);
		match = matchRepository.save(match);
		
		return matchMapper.toMatchWithBotResponse(match);
	}
	
	public List<MatchWithBotResponse> getAll() {
		return matchRepository.findAll()
				.stream()
				.map(matchMapper::toMatchWithBotResponse)
				.toList();
	}
	
	public MatchWithBotResponse getMatch(Long id) {
		MatchWithBot match = matchRepository.findById(id)
				.orElseThrow(() -> new AppException(ErrorCode.MATCH_NOT_EXISTED));
		return matchMapper.toMatchWithBotResponse(match);
	}
	
	public MatchWithBotResponse playWithBot() {
		var authentication = SecurityContextHolder.getContext().getAuthentication();
		String name = authentication.getName();
		
		User user = userRepository.findByUsername(name)
				.orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
		
		MatchWithBot match = new MatchWithBot();
		match.setPlayer(user);
		match = matchRepository.save(match);
		return matchMapper.toMatchWithBotResponse(match);
	}

	public MatchWithBotResponse update(Long id, MatchBotCreationRequest request) {
		return null;
	}
}
