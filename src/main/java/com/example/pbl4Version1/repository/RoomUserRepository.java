package com.example.pbl4Version1.repository;

import com.example.pbl4Version1.entity.RoomUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomUserRepository extends JpaRepository<RoomUser, String> {
    List<RoomUser> findByRoomId(Long roomId);

    @Modifying
    @Query("DELETE FROM RoomUser roomuser WHERE roomuser.room.id = :roomId AND roomuser.user.id = :userId")
    void deleteByRoomIdAndUsername(Long roomId, String userId);
}
