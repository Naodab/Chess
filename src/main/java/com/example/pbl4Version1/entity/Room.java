package com.example.pbl4Version1.entity;

import java.time.LocalDate;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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
public class Room {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	Long id;
	String password;

	@Builder.Default
	LocalDate playDay = LocalDate.now();

	@Builder.Default
	boolean active = true;

	@OneToMany(mappedBy = "room", cascade = CascadeType.ALL)
    Set<RoomUser> roomUsers;
	
	@OneToMany(mappedBy = "room")
	Set<MatchWithHuman> matches;

	Long matchActiveId;

	int time;
}