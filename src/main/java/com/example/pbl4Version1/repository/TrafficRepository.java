package com.example.pbl4Version1.repository;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.pbl4Version1.entity.Traffic;

@Repository
public interface TrafficRepository extends JpaRepository<Traffic, Long> {
    Optional<Traffic> findTrafficByDate(LocalDate date);

    boolean existsByDate(LocalDate date);

    Page<Traffic> findAllByOrderByDateDesc(Pageable pageable);
}
