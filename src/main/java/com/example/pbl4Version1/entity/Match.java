package com.example.pbl4Version1.entity;

import java.util.Set;

import com.example.pbl4Version1.enums.GameStatus;
import com.example.pbl4Version1.enums.PlayerType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.OneToMany;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@Entity(name = "game_match")
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PROTECTED)
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public class Match {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	Long id;

	// Save board state as a FEN
	// FEN format: 
	// row1/row2/row3/row4/row5/row6/row7/roww8 turn isCastleds enPassantPawn numberOfDrawSteps thStep
	@Column(columnDefinition = "TEXT")
	@Builder.Default
	String boardState = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
	
	@Enumerated(EnumType.STRING)
    @Column(nullable = false)
	@Builder.Default
	GameStatus gameStatus = GameStatus.ONGOING;
	
	@Enumerated(EnumType.STRING)
    @Column(nullable = false)
	@Builder.Default
	PlayerType turn = PlayerType.WHITE;
	
	@Enumerated(EnumType.STRING)
	PlayerType winner;
	
	@OneToMany(mappedBy = "match")
	Set<Step> steps;
}
