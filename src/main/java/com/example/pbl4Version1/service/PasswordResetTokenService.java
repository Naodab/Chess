package com.example.pbl4Version1.service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.example.pbl4Version1.dto.request.ForgotRequest;
import com.example.pbl4Version1.entity.PasswordResetToken;
import com.example.pbl4Version1.entity.User;
import com.example.pbl4Version1.exception.AppException;
import com.example.pbl4Version1.exception.ErrorCode;
import com.example.pbl4Version1.repository.PasswordResetTokenRepository;
import com.example.pbl4Version1.repository.UserRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PasswordResetTokenService {
	PasswordResetTokenRepository passwordResetTokenRepository;
	UserRepository userRepository;
	
	@NonFinal
	@Value("${props.valid-password-token}")
	protected Long validTime;
	
	public PasswordResetToken create(ForgotRequest request) {
		String username = request.getUsername();
		User user = userRepository.findByUsername(username)
				.orElse(userRepository.findByEmail(username)
						.orElseThrow(() -> 
							new AppException(ErrorCode.USER_NOT_EXISTED)));
		
		PasswordResetToken token = PasswordResetToken.builder()
				.token(UUID.randomUUID().toString())
				.user(user)
				.expiryDate(new Date(Instant.now()
						.plus(validTime, ChronoUnit.SECONDS)
						.toEpochMilli()))
				.build();
		
		passwordResetTokenRepository.save(token);
		return token;
	}
	
	public boolean isTokenValid(String token) {
        PasswordResetToken resetToken = passwordResetTokenRepository
        		.findByToken(token).orElseThrow(
        				() -> new AppException(ErrorCode.INVALID_RESET_PASSWORD));
        return resetToken != null && resetToken.getExpiryDate().after(new Date());
    }

    public PasswordResetToken getByToken(String token) {
        return passwordResetTokenRepository
        		.findByToken(token).orElseThrow(
        				() -> new AppException(ErrorCode.INVALID_RESET_PASSWORD));
    }

    public void deleteToken(PasswordResetToken token) {
        passwordResetTokenRepository.delete(token);
    }
}
