package com.example.pbl4Version1.service;

import java.util.HashSet;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.pbl4Version1.constant.PredefinedRole;
import com.example.pbl4Version1.dto.request.SearchUserRequest;
import com.example.pbl4Version1.dto.request.UserCreateRequest;
import com.example.pbl4Version1.dto.request.UserUpdateRequest;
import com.example.pbl4Version1.dto.response.UserResponse;
import com.example.pbl4Version1.entity.Achievement;
import com.example.pbl4Version1.entity.Role;
import com.example.pbl4Version1.entity.User;
import com.example.pbl4Version1.enums.OperatingStatus;
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
    static final int USER_PER_PAGE = 10;
    UserRepository userRepository;
    RoleRepository roleRepository;
    AchievementRepository achievementRepository;
    UserMapper userMapper;
    PasswordEncoder passwordEncoder;

    public UserResponse create(UserCreateRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new AppException(ErrorCode.EMAIL_EXISTED);
        }

        User user = userMapper.toUser(request);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        HashSet<Role> roles = new HashSet<Role>();
        roleRepository.findById(PredefinedRole.USER_ROLE).ifPresent(roles::add);
        user.setRoles(roles);
        user.setOperatingStatus(OperatingStatus.OFFLINE);
        user = userRepository.save(user);

        return userMapper.toUserResponse(user);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public List<UserResponse> getAll() {
        return userRepository.findAll().stream().map(userMapper::toUserResponse).toList();
    }

    public UserResponse getMyInfo() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        String name = authentication.getName();
        User user = userRepository.findByUsername(name).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return userMapper.toUserResponse(user);
    }

    @PostAuthorize("returnObject.username == authentication.name")
    public UserResponse getUser(String id) {
        User user = userRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return userMapper.toUserResponse(user);
    }

    public UserResponse getUserByUsername(String username) {
        User user =
                userRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return userMapper.toUserResponse(user);
    }

    public UserResponse getUserByUsernameOrEmail(String username) {
        User user = userRepository
                .findByUsername(username)
                .or(() -> userRepository.findByEmail(username))
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return userMapper.toUserResponse(user);
    }

    public UserResponse update(String id, UserUpdateRequest request) {
        User user = userRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        user = userMapper.updateUser(user, request);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRoles(new HashSet<Role>(roleRepository.findAllById(request.getRoles())));
        user.setAchievements(new HashSet<Achievement>(achievementRepository.findAllById(request.getAchievements())));
        user.setOperatingStatus(OperatingStatus.ONLINE);
        userRepository.save(user);
        return userMapper.toUserResponse(user);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public List<UserResponse> getUsers(int page) {
        Page<User> userPage = userRepository.findAll(PageRequest.of(page, USER_PER_PAGE));
        List<User> users = userPage.getContent();
        return users.stream().map(userMapper::toUserResponse).toList();
    }

    public List<UserResponse> getTop10User() {
        List<User> users = userRepository
                .findAllByOrderByEloDesc(PageRequest.of(0, USER_PER_PAGE))
                .getContent();
        return users.stream().map(userMapper::toUserResponse).toList();
    }

    public void logout(String username) {
        User user =
                userRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        user.setOperatingStatus(OperatingStatus.OFFLINE);
        userRepository.save(user);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public void delete(String id) {
        userRepository.deleteById(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public List<UserResponse> search(SearchUserRequest request) {
        Pageable pageable;
        if (!request.getSortDirection().isEmpty()) {
            Sort sort = request.getSortDirection().equalsIgnoreCase(Sort.Direction.ASC.name())
                    ? Sort.by(request.getSortField()).ascending()
                    : Sort.by(request.getSortField()).descending();
            pageable = PageRequest.of(request.getPage(), USER_PER_PAGE, sort);
        } else {
            pageable = PageRequest.of(request.getPage(), USER_PER_PAGE);
        }
        Page<User> userPage = userRepository.findByUsernameContainingIgnoreCaseOrEmailContainingIgnoreCase(
                request.getSearchStr(), request.getSearchStr(), pageable);
        return userPage.getContent().stream().map(userMapper::toUserResponse).toList();
    }

    @PreAuthorize("hasRole('ADMIN')")
    public long countSearch(String searchStr) {
        return userRepository.countByUsernameContainingIgnoreCaseOrEmailContainingIgnoreCase(searchStr, searchStr);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public void banOrUnban(String userID) {
        User user = userRepository.findById(userID).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        user.setActive(!user.isActive());
        userRepository.save(user);
    }
}
