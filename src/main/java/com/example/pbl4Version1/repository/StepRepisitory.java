package com.example.pbl4Version1.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.pbl4Version1.entity.Step;

@Repository
public interface StepRepisitory extends JpaRepository<Step, Long> {
    @Query("SELECT s FROM game_step s WHERE s.match.id = :matchId")
    List<Step> findByMatchId(@Param("matchId") Long matchId);
}
