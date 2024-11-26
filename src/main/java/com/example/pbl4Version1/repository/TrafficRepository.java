package com.example.pbl4Version1.repository;

import com.example.pbl4Version1.entity.Traffic;
import com.example.pbl4Version1.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface TrafficRepository extends JpaRepository<Traffic, Long> {
    Optional<Traffic> findTrafficByDate(LocalDate date);
    boolean existsByDate(LocalDate date);
    Page<Traffic> findAllByOrderByDateDesc(Pageable pageable);
}