package com.example.pbl4Version1.service;

import org.springframework.stereotype.Service;

import com.example.pbl4Version1.chessEngine.ai.MiniMax;
import com.example.pbl4Version1.chessEngine.ai.MoveStrategy;
import com.example.pbl4Version1.chessEngine.board.Board;
import com.example.pbl4Version1.chessEngine.board.BoardUtils;
import com.example.pbl4Version1.chessEngine.board.Move;
import com.example.pbl4Version1.dto.request.StepRequest;
import com.example.pbl4Version1.dto.request.StepToBotRequest;
import com.example.pbl4Version1.dto.response.StepResponse;
import com.example.pbl4Version1.entity.MatchWithBot;
import com.example.pbl4Version1.entity.MatchWithHuman;
import com.example.pbl4Version1.entity.Step;
import com.example.pbl4Version1.exception.AppException;
import com.example.pbl4Version1.exception.ErrorCode;
import com.example.pbl4Version1.mapper.StepMapper;
import com.example.pbl4Version1.repository.MatchWithBotRepository;
import com.example.pbl4Version1.repository.MatchWithHumanRepository;
import com.example.pbl4Version1.repository.StepRepisitory;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class StepService {
	MatchWithBotRepository matchWithBotRepository;
	MatchWithHumanRepository matchWithHumanRepository;
	StepRepisitory stepRepository;
	StepMapper stepMapper;
	
	public StepResponse create(StepRequest request) {
		Step step = stepMapper.toStep(request);
		MatchWithHuman match = matchWithHumanRepository.findById(request.getMatchId())
				.orElseThrow(() -> new AppException(ErrorCode.MATCH_NOT_EXISTED));
		step.setMatch(match);
		step = stepRepository.save(step);
		return stepMapper.toStepResponse(step);
	}
	
	public StepResponse toBot(StepToBotRequest request) {
		MatchWithBot mwb = matchWithBotRepository.findById(request.getMatchId())
				.orElseThrow(() -> new AppException(ErrorCode.MATCH_NOT_EXISTED));
		
		Step stepUser = stepMapper.toStep(request);
		stepUser.setMatch(mwb);
		stepRepository.save(stepUser);
		// TODO: Handle game status
		
		mwb.setBoardState(request.getFen());
		Board board = Board.createByFEN(request.getFen());
		
		MoveStrategy minmax = new MiniMax(4);
		Move bestMove = minmax.excute(board);
		String from = BoardUtils.getPositionAtCoordinate(bestMove.getCurrentCoordinate());
		String to = BoardUtils.getPositionAtCoordinate(bestMove.getDestinationCoordinate());
		
		Step stepAI = Step.builder()
				.from(from)
				.to(to)
				.thTime(mwb.getSteps().size() + 1)
				.match(mwb)
				.build();
		stepRepository.save(stepAI);
		matchWithBotRepository.save(mwb);
		
		return StepResponse.builder()
				.from(from)
				.to(to)
				.build();
	}
}
