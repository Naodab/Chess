package com.example.pbl4Version1.entity;

import com.example.pbl4Version1.enums.Mode;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoomUser {
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	String id;
	
	@ManyToOne
	@JoinColumn(name = "room_id", nullable = false)
	Room room;
	
	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	User user;
	
	@Enumerated(EnumType.STRING)
    @Column(nullable = false)
	Mode role;
}
