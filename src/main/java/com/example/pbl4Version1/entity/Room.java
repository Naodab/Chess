package com.example.pbl4Version1.entity;

import java.time.LocalDate;
import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
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

	@ManyToOne
	@JoinColumn(name = "host_id")
	User host;

	@ManyToOne
	@JoinColumn(name = "player_id")
	User player;

	@ManyToMany
	@JoinTable(name = "room_viewers", 
		joinColumns = @JoinColumn(name = "room_id"), 
		inverseJoinColumns = @JoinColumn(name = "viewer_id"))
	Set<User> viewers;
	
	@OneToMany(mappedBy = "room")
	Set<MatchWithHuman> matches;
}