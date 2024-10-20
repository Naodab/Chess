package com.example.pbl4Version1.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.pbl4Version1.entity.MatchWithHuman;

@Repository
public interface MatchWithHumanRepository extends JpaRepository<MatchWithHuman, Long>{
}
