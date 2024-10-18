package com.example.pbl4Version1.repository;

import com.example.pbl4Version1.entity.RoomUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomUserRepository extends JpaRepository<RoomUser, String> {
}
