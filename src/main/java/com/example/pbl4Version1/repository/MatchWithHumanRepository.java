package com.example.pbl4Version1.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.pbl4Version1.entity.MatchWithHuman;

@Repository
public interface MatchWithHumanRepository extends JpaRepository<MatchWithHuman, Long> {
    @Query("SELECT m FROM MatchWithHuman m WHERE m.whitePlayer.id = :userId OR m.blackPlayer.id = :userId")
    Page<MatchWithHuman> findMatchesByUserId(@Param("userId") String userId, Pageable pageable);

    @Query("SELECT COUNT(m) FROM MatchWithHuman m WHERE MONTH(m.createdAt) = :month AND YEAR(m.createdAt) = :year")
    long countByMonthAndYear(@Param("month") int month, @Param("year") int year);

    @Query(
            value = "SELECT DATE(created_at) AS match_date, COUNT(*) AS match_count " + "FROM match_with_human "
                    + "WHERE created_at >= DATE_SUB(CURRENT_DATE, INTERVAL 7 DAY) "
                    + "GROUP BY DATE(created_at) "
                    + "ORDER BY match_date",
            nativeQuery = true)
    List<Object[]> countMatchesPerDayInLast7Days();

    Page<MatchWithHuman> findAll(Pageable pageable);
}
