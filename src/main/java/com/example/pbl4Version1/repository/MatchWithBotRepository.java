package com.example.pbl4Version1.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.pbl4Version1.entity.MatchWithBot;

import java.util.Optional;

@Repository
public interface MatchWithBotRepository extends JpaRepository<MatchWithBot, Long>{
    @Query("SELECT m FROM MatchWithBot m LEFT JOIN FETCH m.steps WHERE m.id = :id")
    Optional<MatchWithBot> findByIdWithSteps(@Param("id") Long id);
}
