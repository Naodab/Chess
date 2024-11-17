package com.example.pbl4Version1.entity;

import java.util.Set;

import com.example.pbl4Version1.enums.GameStatus;
import com.example.pbl4Version1.enums.PlayerType;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Entity
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MatchWithHuman extends Match {
	@ManyToOne(cascade = CascadeType.ALL)
	Room room;
	
	@ManyToOne
	@JoinColumn(name = "white_player_id")
	User whitePlayer;
	
	@ManyToOne
	@JoinColumn(name = "black_player_id")
	User blackPlayer;

	int timeWhiteUser;
	int timeBlackUser;
	
	public MatchWithHuman() {}

	public MatchWithHuman(Long id, GameStatus gameStatus, 
			PlayerType turn, PlayerType winner, Set<Step> steps, 
			Room room, User whitePlayer, User blackPlayer, int time) {
		super(id, gameStatus, turn, winner, steps);
		this.room = room;
		this.whitePlayer = whitePlayer;
		this.blackPlayer = blackPlayer;
		this.timeWhiteUser = time;
		this.timeBlackUser = time;
	}
}