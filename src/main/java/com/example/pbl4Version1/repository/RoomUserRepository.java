package com.example.pbl4Version1.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.pbl4Version1.entity.RoomUser;

@Repository
public interface RoomUserRepository extends JpaRepository<RoomUser, String> {
    List<RoomUser> findByRoomId(Long roomId);

    @Modifying
    @Transactional
    @Query("DELETE FROM RoomUser roomuser WHERE roomuser.room.id = :roomId AND roomuser.user.id = :userId")
    void deleteByRoomIdAndUserId(Long roomId, String userId);
}
