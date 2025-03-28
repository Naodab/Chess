package com.example.pbl4Version1.entity;

import java.util.Date;
import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import com.example.pbl4Version1.enums.GameStatus;
import com.example.pbl4Version1.enums.PlayerType;

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
public class MatchWithBot extends Match {
    @ManyToOne
    @JoinColumn(name = "user_id")
    User player;

    public MatchWithBot() {}

    public MatchWithBot(
            Long id,
            GameStatus gameStatus,
            PlayerType turn,
            PlayerType winner,
            Set<Step> steps,
            User player,
            Date createdAt) {
        super(id, gameStatus, turn, winner, steps, createdAt);
        this.player = player;
    }
}
