package com.example.pbl4Version1.service;

import java.util.HashSet;
import java.util.List;

import com.example.pbl4Version1.dto.request.MatchWithHumanUpdateRequest;
import com.example.pbl4Version1.entity.Room;
import com.example.pbl4Version1.enums.GameStatus;
import com.example.pbl4Version1.enums.PlayerType;
import com.example.pbl4Version1.repository.StepRepisitory;
import org.springframework.stereotype.Service;

import com.example.pbl4Version1.dto.request.MatchCreationRequest;
import com.example.pbl4Version1.dto.response.MatchWithHumanResponse;
import com.example.pbl4Version1.entity.MatchWithHuman;
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
	StepRepisitory stepRepisitory;
	MatchMapper matchMapper;
	
	public MatchWithHumanResponse create(MatchCreationRequest request) {
		MatchWithHuman match = matchMapper.toMatchWithHuman(request);
		
		match.setBlackPlayer(userRepository.findById(request.getBlackPlayerId())
				.orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED)));
		
		match.setWhitePlayer(userRepository.findById(request.getWhitePlayerId())
				.orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED)));
		Room room = roomRepository.findById(request.getRoomId())
				.orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_EXISTED));
		match.setRoom(room);
		match.setTimeBlackUser(room.getTime() * 60);
		match.setTimeWhiteUser(room.getTime() * 60);

		match = matchRepository.save(match);

		match.getWhitePlayer().setBattleNumber(match.getWhitePlayer().getBattleNumber() + 1);
		match.getBlackPlayer().setBattleNumber(match.getBlackPlayer().getBattleNumber() + 1);
		room.setMatchActiveId(match.getId());
		roomRepository.save(room);
		userRepository.save(match.getBlackPlayer());
		userRepository.save(match.getWhitePlayer());
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
		match.setSteps(new HashSet<>(stepRepisitory.findByMatchId(match.getId())));
		return matchMapper.toMatchWithHumanResponse(match);
	}

	public MatchWithHumanResponse updateMatchWithHuman(Long matchId, MatchWithHumanUpdateRequest request) {
		MatchWithHuman match = matchRepository.findById(matchId)
				.orElseThrow(() -> new AppException(ErrorCode.MATCH_NOT_EXISTED));
		if (request.getTimeWhitePlayer() != null)
			match.setTimeWhiteUser(request.getTimeWhitePlayer());

		if (request.getTimeBlackPlayer() != null)
			match.setTimeBlackUser(request.getTimeBlackPlayer());

		if (request.getWinnerId() != null) {
			if (match.getBlackPlayer().getId().equals(request.getWinnerId())) {
				match.setWinner(PlayerType.BLACK);
				match.getBlackPlayer().setWinNumber(match.getBlackPlayer().getWinNumber() + 1);
			}
			else if (match.getWhitePlayer().getId().equals(request.getWinnerId())) {
				match.setWinner(PlayerType.WHITE);
				match.getWhitePlayer().setWinNumber(match.getWhitePlayer().getWinNumber() + 1);
			}
			else if (request.getWinnerId().equalsIgnoreCase("DRAW")) {
				match.setWinner(PlayerType.DRAW);
				match.getBlackPlayer().setDrawNumber(match.getBlackPlayer().getDrawNumber() + 1);
				match.getWhitePlayer().setDrawNumber(match.getWhitePlayer().getDrawNumber() + 1);
			}

			int[] newElo = calculateEloAfterMatch(match.getWhitePlayer().getElo(),
					match.getBlackPlayer().getElo(), match.getWinner());

			match.getWhitePlayer().setElo(newElo[0]);
			match.getBlackPlayer().setElo(newElo[1]);
			userRepository.save(match.getWhitePlayer());
			userRepository.save(match.getBlackPlayer());
			log.info(request.getGameStatus());
			match.setGameStatus(GameStatus.valueOf(request.getGameStatus()));
		}

		match = matchRepository.save(match);
		return matchMapper.toMatchWithHumanResponse(match);
	}

	public int determineKFactor(int elo) {
		if (elo < 1600) {
			return 32;
		} else if (elo <= 2400) {
			return 24;
		} else {
			return 16;
		}
	}

	public double calculateExpectedScore(double ratingA, double ratingB) {
		return 1.0 / (1.0 + Math.pow(10, (ratingB - ratingA) / 400.0));
	}

	public double calculateNewRating(double currentRating, double expectedScore,
									 double actualScore, int kFactor) {
		return currentRating + kFactor * (actualScore - expectedScore);
	}

	public int[] calculateEloAfterMatch(int eloWhite, int eloBlack, PlayerType playerType) {
		int kFactorWhite = determineKFactor(eloWhite);
		int kFactorBlack = determineKFactor(eloBlack);
		double expectedScoreWhite = calculateExpectedScore(eloWhite, eloBlack);
		double expectedScoreBlack = calculateExpectedScore(eloBlack, eloWhite);
		double actualScoreWhite = 0, actualScoreBlack = 0;
		switch (playerType) {
			case BLACK:
				actualScoreBlack = 1.0;
				break;
			case WHITE:
				actualScoreWhite = 1.0;
				break;
			default:
				actualScoreBlack = 0.5;
				actualScoreWhite = 0.5;
				break;
		}
		double newRatingWhite = calculateNewRating(eloWhite,
				expectedScoreWhite, actualScoreWhite, kFactorWhite);
		double newRatingBlack = calculateNewRating(eloBlack,
				expectedScoreBlack, actualScoreBlack, kFactorBlack);

		int[] result = {(int) newRatingWhite, (int) newRatingBlack};
		return result;
	}
}
