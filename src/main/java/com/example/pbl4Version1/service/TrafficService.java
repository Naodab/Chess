package com.example.pbl4Version1.service;

import com.example.pbl4Version1.dto.response.AccountDataResponse;
import com.example.pbl4Version1.dto.response.MatchDataResponse;
import com.example.pbl4Version1.dto.response.MatchInDateResponse;
import com.example.pbl4Version1.entity.Traffic;
import com.example.pbl4Version1.enums.OperatingStatus;
import com.example.pbl4Version1.repository.MatchWithBotRepository;
import com.example.pbl4Version1.repository.MatchWithHumanRepository;
import com.example.pbl4Version1.repository.TrafficRepository;
import com.example.pbl4Version1.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TrafficService {
    TrafficRepository trafficRepository;
    UserRepository userRepository;
    MatchWithHumanRepository matchWithHumanRepository;
    MatchWithBotRepository matchWithBotRepository;

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

    @PreAuthorize("hasRole('ADMIN')")
    public List<Traffic> getTrafficRecently(int page) {
        Pageable pageable = PageRequest.of(page, 7);
        Page<Traffic> trafficPage = trafficRepository.findAllByOrderByDateDesc(pageable);
        return trafficPage.getContent();
    }

    @PreAuthorize("hasRole('ADMIN')")
    public MatchDataResponse getMatchesData() {
        long matchWithBotSize = matchWithBotRepository.count();
        long matchWithHumanSize = matchWithHumanRepository.count();
        LocalDate date = LocalDate.now();
        long matchInMonth = matchWithBotRepository.countByMonthAndYear(date.getMonthValue(), date.getYear())
                + matchWithHumanRepository.countByMonthAndYear(date.getMonthValue(), date.getYear());
        return MatchDataResponse.builder()
                .matchBotSize(matchWithBotSize)
                .matchHumanSize(matchWithHumanSize)
                .matchInMonth(matchInMonth)
                .build();
    }

    public List<MatchInDateResponse> getMatchIn7Days() {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.DAY_OF_YEAR, -7);
        Date sevenDaysAgo = calendar.getTime();
        List<MatchInDateResponse> result = new ArrayList<>();

        List<Object[]>  listData = matchWithBotRepository.countMatchesPerDayInLast7Days();
        for (Object[] data : listData) {
            Date matchDate = (Date) data[0];
            long matchCount = ((Number) data[1]).longValue();
            result.add(MatchInDateResponse.builder().matchDate(matchDate).size(matchCount).build());
        }

        listData = matchWithHumanRepository.countMatchesPerDayInLast7Days();
        for (Object[] data : listData) {
            Date matchDate = (Date) data[0];
            long matchCount = ((Number) data[1]).longValue();
            result.add(MatchInDateResponse.builder().matchDate(matchDate).size(matchCount).build());
        }
        return result;
    }
}
