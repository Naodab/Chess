package com.example.pbl4Version1.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.pbl4Version1.entity.MatchWithHuman;

import java.util.List;

@Repository
public interface MatchWithHumanRepository extends JpaRepository<MatchWithHuman, Long>{
    @Query("SELECT m FROM MatchWithHuman m WHERE m.whitePlayer.id = :userId OR m.blackPlayer.id = :userId")
    Page<MatchWithHuman> findMatchesByUserId(@Param("userId") String userId, Pageable pageable);

}