package com.example.pbl4Version1.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.pbl4Version1.dto.request.RoleRequest;
import com.example.pbl4Version1.dto.response.RoleResponse;
import com.example.pbl4Version1.entity.Role;
import com.example.pbl4Version1.mapper.RoleMapper;
import com.example.pbl4Version1.repository.RoleRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RoleService {
    RoleRepository roleRepository;
    RoleMapper roleMapper;

    public RoleResponse create(RoleRequest request) {
        Role role = roleMapper.toRole(request);
        role = roleRepository.save(role);
        return roleMapper.toRoleResponse(role);
    }

    public List<RoleResponse> getAll() {
        return roleRepository.findAll().stream().map(roleMapper::toRoleResponse).toList();
    }

    public void delete(String name) {
        roleRepository.deleteById(name);
    }
}
