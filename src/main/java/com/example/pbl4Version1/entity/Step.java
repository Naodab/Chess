package com.example.pbl4Version1.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@Entity(name = "game_step")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Step {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	Long id;
	int thTime;
	
	@ManyToOne(cascade = CascadeType.ALL)
	Match match;
	
	@Column(name = "from_position")
	String from;
	
	@Column(name = "to_position")
	String to;
}