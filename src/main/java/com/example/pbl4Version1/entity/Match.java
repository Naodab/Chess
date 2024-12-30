package com.example.pbl4Version1.entity;

import java.util.Date;
import java.util.Set;

import jakarta.persistence.*;

import org.hibernate.annotations.CreationTimestamp;

import com.example.pbl4Version1.enums.GameStatus;
import com.example.pbl4Version1.enums.PlayerType;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
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

    @OneToMany(mappedBy = "match", fetch = FetchType.EAGER)
    Set<Step> steps;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;
}
