package com.example.pbl4Version1.service;

import com.example.pbl4Version1.enums.GameStatus;
import com.example.pbl4Version1.enums.PlayerType;
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

import java.util.List;

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

		// TODO: handle for human win
		Board board = Board.createByFEN(request.getFen());
		if (board.getCurrentPlayer().isInCheckMate()) {
			mwb.setGameStatus(GameStatus.CHECKMATE);
			mwb.setWinner(PlayerType.HUMAN);
			matchWithBotRepository.save(mwb);
			return StepResponse.builder()
					.winner(mwb.getWinner().name())
					.gameStatus(mwb.getGameStatus().name())
					.build();
		} else if (board.getCurrentPlayer().isInStaleMate()) {
			mwb.setGameStatus(GameStatus.STALEMATE);
			mwb.setWinner(PlayerType.HUMAN);
			matchWithBotRepository.save(mwb);
			return StepResponse.builder()
					.winner(mwb.getWinner().name())
					.gameStatus(mwb.getGameStatus().name())
					.build();
		}

		MoveStrategy minmax = new MiniMax(4);
		Move bestMove = minmax.execute(board);
        Board executeBoard = board.getCurrentPlayer().makeMove(bestMove).getTransitionBoard();

		if (executeBoard.getCurrentPlayer().isInCheckMate()) {
			mwb.setGameStatus(GameStatus.CHECKMATE);
			mwb.setWinner(PlayerType.COMPUTER);
		} else if (executeBoard.getCurrentPlayer().isInStaleMate()) {
			mwb.setGameStatus(GameStatus.STALEMATE);
			mwb.setWinner(PlayerType.COMPUTER);
		}

		String from = BoardUtils.getPositionAtCoordinate(bestMove.getCurrentCoordinate());
		String to = BoardUtils.getPositionAtCoordinate(bestMove.getDestinationCoordinate());

		String[] info = request.getFen().split(" ");
		int turnDraw = (bestMove.isAttack() || bestMove.getMovedPiece().getPieceType().isPawn())
				? 0 : Integer.parseInt(info[4]);
		turnDraw++;
		int turn = Integer.parseInt(info[5]);
		turn++;
		String fen = executeBoard.generateFen() + turnDraw + " " + turn;
		Step stepAI = Step.builder()
				.from(from)
				.to(to)
				.match(mwb)
				.boardState(fen)
				.build();

		stepRepository.save(stepAI);
		matchWithBotRepository.save(mwb);

		StepResponse response = stepMapper.toStepResponse(stepAI);
		response.setGameStatus(mwb.getGameStatus().name());
		if (mwb.getWinner() != null)
			response.setWinner(mwb.getWinner().name());
		return response;
	}

	public StepResponse getNewestStepOfMatchWithBot(Long matchID) {
		MatchWithBot mwb = matchWithBotRepository.findById(matchID)
				.orElseThrow(() -> new AppException(ErrorCode.MATCH_NOT_EXISTED));
		List<Step> steps = stepRepository.findByMatchId(matchID);
		log.info("getNewestStepOfMatchWithBot: " + steps.isEmpty());
		if (!steps.isEmpty()) {
			int size = steps.size();
			log.info("size: " + size);
			for (Step step : steps) {
				log.info("step: " + step.getBoardState().split(" ")[5]);
				if (size ==  Integer.parseInt(step.getBoardState().split(" ")[5])) {
					log.info("fen: " + step.getBoardState());
					return stepMapper.toStepResponse(step);
				}
			}

		}
		return stepMapper.toStepResponse(Step.builder().match(mwb).build());
	}
}
