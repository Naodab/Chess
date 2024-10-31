package com.example.pbl4Version1.repository;

import com.example.pbl4Version1.entity.RoomUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.pbl4Version1.entity.Room;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    @Query("SELECT r FROM Room r LEFT JOIN FETCH r.roomUsers ru LEFT JOIN FETCH ru.user")
    List<Room> findAllWithUsers();
    List<Room> findAllByActive(boolean active);
}
