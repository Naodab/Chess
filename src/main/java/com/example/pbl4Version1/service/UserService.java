package com.example.pbl4Version1.service;

import java.util.HashSet;
import java.util.List;

import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.pbl4Version1.constant.PredefinedRole;
import com.example.pbl4Version1.dto.request.UserCreateRequest;
import com.example.pbl4Version1.dto.request.UserUpdateRequest;
import com.example.pbl4Version1.dto.response.UserResponse;
import com.example.pbl4Version1.entity.Achievement;
import com.example.pbl4Version1.entity.Role;
import com.example.pbl4Version1.entity.User;
import com.example.pbl4Version1.enums.Rank;
import com.example.pbl4Version1.exception.AppException;
import com.example.pbl4Version1.exception.ErrorCode;
import com.example.pbl4Version1.mapper.UserMapper;
import com.example.pbl4Version1.repository.AchievementRepository;
import com.example.pbl4Version1.repository.RoleRepository;
import com.example.pbl4Version1.repository.UserRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserService {
	UserRepository userRepository;
	RoleRepository roleRepository;
	AchievementRepository achievementRepository;
	UserMapper userMapper;
	PasswordEncoder passwordEncoder;
	
	public UserResponse create(UserCreateRequest request) {
		if (userRepository.existsByUsername(request.getUsername())) {
			throw new AppException(ErrorCode.USER_EXISTED);
		}
		
		User user = userMapper.toUser(request);
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		HashSet<Role> roles = new HashSet<Role>();
        roleRepository.findById(PredefinedRole.USER_ROLE).ifPresent(roles::add);
        user.setRoles(roles);
        user.setRank(Rank.INTERMEDIATE);
        user = userRepository.save(user);
        
		return userMapper.toUserResponse(user);
	}

	@PreAuthorize("hasRole('ADMIN')")
	public List<UserResponse> getAll() {
		return userRepository.findAll()
				.stream()
				.map(userMapper::toUserResponse)
				.toList();
	}
	
	public UserResponse getMyInfo() {
		var authentication = SecurityContextHolder.getContext().getAuthentication();
		String name = authentication.getName();
		User user = userRepository.findByUsername(name).orElseThrow(() 
				-> new AppException(ErrorCode.USER_NOT_EXISTED));
		UserResponse userResponse = userMapper.toUserResponse(user);
		return userResponse;
	}
	
	@PostAuthorize("returnObject.username == authentication.name")
	public UserResponse getUser(String id) {
		User user = userRepository.findById(id).orElseThrow(
				() -> new AppException(ErrorCode.USER_NOT_EXISTED));
		return userMapper.toUserResponse(user);
	}
	
	public UserResponse update(String id, UserUpdateRequest request) {
		User user = userRepository.findById(id).orElseThrow(
				() -> new AppException(ErrorCode.USER_NOT_EXISTED));
		user = userMapper.updateUser(user, request);
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		user.setRoles(new HashSet<Role>(roleRepository.findAllById(request.getRoles())));
		user.setAchievements(new HashSet<Achievement>(achievementRepository
				.findAllById(request.getAchievements())));
		user.setRank(Rank.valueOf(request.getRank().toUpperCase()));
		userRepository.save(user);
		return userMapper.toUserResponse(user);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	public void delete(String id) {
		userRepository.deleteById(id);
	}
}
