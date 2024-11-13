package com.example.pbl4Version1.repository;

import java.util.Optional;

import com.example.pbl4Version1.enums.OperatingStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.pbl4Version1.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
	boolean existsByUsername(String username);
	boolean existsByEmail(String email);
	Optional<User> findByUsername(String username);
	Optional<User> findByEmail(String email);
	long countUserByOperatingStatus(OperatingStatus operatingStatus);

	@Query("SELECT COUNT(u) FROM User u WHERE MONTH(u.createDate) = :month AND YEAR(u.createDate) = :year")
	long countUsersCreatedInMonth(@Param("month") int month, @Param("year") int year);

	Page<User> findAll(Pageable pageable);
	Page<User> findAllByOrderByEloDesc(Pageable pageable);
}
