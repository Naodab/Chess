package com.example.pbl4Version1.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.pbl4Version1.entity.MatchWithBot;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface MatchWithBotRepository extends JpaRepository<MatchWithBot, Long>{
    @Query("SELECT m FROM MatchWithBot m LEFT JOIN FETCH m.steps WHERE m.id = :id")
    Optional<MatchWithBot> findByIdWithSteps(@Param("id") Long id);

    @Query("SELECT COUNT(m) FROM MatchWithBot m WHERE MONTH(m.createdAt) = :month AND YEAR(m.createdAt) = :year")
    long countByMonthAndYear(@Param("month") int month, @Param("year") int year);

    @Query(value =  "SELECT DATE(created_at) AS match_date, COUNT(*) AS match_count " +
                    "FROM match_with_bot " +
                    "WHERE created_at >= DATE_SUB(CURRENT_DATE, INTERVAL 7 DAY) " +
                    "GROUP BY DATE(created_at) " +
                    "ORDER BY match_date",
                    nativeQuery = true)
    List<Object[]> countMatchesPerDayInLast7Days();
}
