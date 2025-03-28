package com.example.pbl4Version1.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.pbl4Version1.entity.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, String> {}
