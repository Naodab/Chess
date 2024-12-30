package com.example.pbl4Version1.mapper;

import org.springframework.stereotype.Component;

import com.example.pbl4Version1.dto.request.RoleRequest;
import com.example.pbl4Version1.dto.response.RoleResponse;
import com.example.pbl4Version1.entity.Role;

@Component
public class RoleMapper {
    public Role toRole(RoleRequest request) {
        return Role.builder()
                .name(request.getName())
                .description(request.getDescription())
                .build();
    }

    public RoleResponse toRoleResponse(Role role) {
        return RoleResponse.builder()
                .name(role.getName())
                .description(role.getDescription())
                .build();
    }
}
