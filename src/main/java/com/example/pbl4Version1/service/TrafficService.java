package com.example.pbl4Version1.service;

import com.example.pbl4Version1.dto.response.AccountDataResponse;
import com.example.pbl4Version1.entity.Traffic;
import com.example.pbl4Version1.enums.OperatingStatus;
import com.example.pbl4Version1.repository.TrafficRepository;
import com.example.pbl4Version1.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TrafficService {
    TrafficRepository trafficRepository;
    UserRepository userRepository;

    @PreAuthorize("hasRole('ADMIN')")
    public AccountDataResponse getAccountData() {
        LocalDate today = LocalDate.now();
        long onlineSize = userRepository.countUserByOperatingStatus
                (OperatingStatus.ONLINE);
        long userSize = userRepository.count();
        long trafficSize = trafficRepository
                .findTrafficByDate(today)
                .orElse(new Traffic()).getSize();
        long newUser = userRepository.countUsersCreatedInMonth
                (today.getMonthValue(), today.getYear());

        return AccountDataResponse.builder()
                .newMemberSize(newUser)
                .trafficSize(trafficSize)
                .onlineSize(onlineSize)
                .userSize(userSize)
                .build();
    }
}
