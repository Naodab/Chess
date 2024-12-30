package com.example.pbl4Version1.service;

import java.util.HashSet;
import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
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
import com.example.pbl4Version1.repository.StepRepisitory;
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
    StepRepisitory stepRepisitory;
    MatchMapper matchMapper;

    @PreAuthorize("hasRole('ADMIN')")
    public List<MatchWithBotResponse> getAll() {
        return matchRepository.findAll().stream()
                .map(matchMapper::toMatchWithBotResponse)
                .toList();
    }

    public MatchWithBotResponse getMatch(Long id) {
        MatchWithBot match =
                matchRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.MATCH_NOT_EXISTED));
        match.setSteps(new HashSet<>(stepRepisitory.findByMatchId(match.getId())));
        log.info("get steps completely");
        return matchMapper.toMatchWithBotResponse(match);
    }

    public MatchWithBotResponse create() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        String name = authentication.getName();
        User user = userRepository.findByUsername(name).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        MatchWithBot match = new MatchWithBot();
        match.setPlayer(user);
        match = matchRepository.save(match);
        return matchMapper.toMatchWithBotResponse(match);
    }

    public MatchWithBotResponse update(Long id, MatchBotCreationRequest request) {
        return null;
    }
}
