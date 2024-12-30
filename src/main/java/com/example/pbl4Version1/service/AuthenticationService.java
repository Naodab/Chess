package com.example.pbl4Version1.service;

import java.text.ParseException;
import java.time.Instant;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Random;
import java.util.StringJoiner;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.example.pbl4Version1.dto.request.*;
import com.example.pbl4Version1.dto.response.AuthenticationResponse;
import com.example.pbl4Version1.dto.response.IntrospectResponse;
import com.example.pbl4Version1.dto.response.VerifyPasswordResponse;
import com.example.pbl4Version1.entity.InvalidatedToken;
import com.example.pbl4Version1.entity.PasswordResetToken;
import com.example.pbl4Version1.entity.Traffic;
import com.example.pbl4Version1.entity.User;
import com.example.pbl4Version1.enums.OperatingStatus;
import com.example.pbl4Version1.exception.AppException;
import com.example.pbl4Version1.exception.ErrorCode;
import com.example.pbl4Version1.repository.InvalidatedTokenRepository;
import com.example.pbl4Version1.repository.PasswordResetTokenRepository;
import com.example.pbl4Version1.repository.TrafficRepository;
import com.example.pbl4Version1.repository.UserRepository;
import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSObject;
import com.nimbusds.jose.JWSVerifier;
import com.nimbusds.jose.Payload;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationService {
    InvalidatedTokenRepository invalidatedTokenRepository;
    PasswordResetTokenRepository passwordResetTokenRepository;
    UserRepository userRepository;
    TrafficRepository trafficRepository;
    PasswordEncoder passwordEncoder;

    @NonFinal
    @Value("${jwt.signerKey}")
    protected String SIGNER_KEY;

    @NonFinal
    @Value("${jwt.valid-duration}")
    protected long VALID_DURATION;

    @NonFinal
    @Value("${jwt.refreshable-duration}")
    protected long REFRESHABLE_DURATION;

    @NonFinal
    @Value("${props.valid-password-token}")
    protected Long VALID_VERIFY_TIME;

    public IntrospectResponse introspect(IntrospectRequest request) throws JOSEException, ParseException {
        var token = request.getToken();
        boolean isValid = true;
        try {
            verify(token, false);
        } catch (AppException e) {
            isValid = false;
        }
        return IntrospectResponse.builder().valid(isValid).build();
    }

    public void logout(LogoutRequest request) throws ParseException, JOSEException {
        try {
            var signToken = verify(request.getToken(), true);
            String jit = signToken.getJWTClaimsSet().getJWTID();
            Date expiryTime = signToken.getJWTClaimsSet().getExpirationTime();
            InvalidatedToken invalidatedToken =
                    InvalidatedToken.builder().id(jit).expiryTime(expiryTime).build();
            String username = signToken.getJWTClaimsSet().getSubject();

            User user = userRepository
                    .findByUsername(username)
                    .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
            userRepository.save(user);

            invalidatedTokenRepository.save(invalidatedToken);
        } catch (AppException exception) {
            log.info("Token already expired");
        }
    }

    public AuthenticationResponse refreshToken(RefreshRequest request) throws ParseException, JOSEException {
        var signedJWT = verify(request.getToken(), true);
        var jit = signedJWT.getJWTClaimsSet().getJWTID();
        var expiryTime = signedJWT.getJWTClaimsSet().getExpirationTime();
        InvalidatedToken invalidatedToken =
                InvalidatedToken.builder().id(jit).expiryTime(expiryTime).build();
        invalidatedTokenRepository.save(invalidatedToken);
        var username = signedJWT.getJWTClaimsSet().getSubject();
        var user =
                userRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.UNAUTHENTICATED));
        var token = generateToken(user);
        return AuthenticationResponse.builder().token(token).build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        User user = userRepository
                .findByUsername(request.getUsername())
                .or(() -> userRepository.findByEmail(request.getUsername()))
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        boolean authenticated = passwordEncoder.matches(request.getPassword(), user.getPassword());
        if (!authenticated) throw new AppException(ErrorCode.UNAUTHENTICATED);
        user.setLatestLogin(LocalDate.now());
        String token = generateToken(user);
        Traffic traffic = new Traffic();
        if (trafficRepository.existsByDate(LocalDate.now())) {
            traffic = trafficRepository.findTrafficByDate(LocalDate.now()).orElseThrow();
        } else {
            traffic.setDate(LocalDate.now());
        }
        traffic.setSize(traffic.getSize() + 1);
        trafficRepository.save(traffic);
        user.setOperatingStatus(OperatingStatus.ONLINE);
        userRepository.save(user);

        return AuthenticationResponse.builder().token(token).build();
    }

    public SignedJWT verify(String token, boolean isRefresh) throws JOSEException, ParseException {
        JWSVerifier verifier = new MACVerifier(SIGNER_KEY.getBytes());
        SignedJWT signedJWT = SignedJWT.parse(token);
        Date expiryTime = (isRefresh)
                ? new Date(signedJWT
                        .getJWTClaimsSet()
                        .getIssueTime()
                        .toInstant()
                        .plus(REFRESHABLE_DURATION, ChronoUnit.SECONDS)
                        .toEpochMilli())
                : signedJWT.getJWTClaimsSet().getExpirationTime();
        var verified = signedJWT.verify(verifier);
        if (!(verified && expiryTime.after(new Date()))) throw new AppException(ErrorCode.UNAUTHENTICATED);
        if (invalidatedTokenRepository.existsById(signedJWT.getJWTClaimsSet().getJWTID()))
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        return signedJWT;
    }

    public PasswordResetToken createTokenForResetPassword(ForgotRequest request) {
        User user = userRepository
                .findByUsername(request.getUsername())
                .or(() -> userRepository.findByEmail(request.getUsername()))
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        PasswordResetToken token = PasswordResetToken.builder()
                .token(generateString(6))
                .user(user)
                .expiryDate(new Date(Instant.now()
                        .plus(VALID_VERIFY_TIME, ChronoUnit.SECONDS)
                        .toEpochMilli()))
                .build();
        passwordResetTokenRepository.save(token);
        return token;
    }

    public VerifyPasswordResponse verifyPassword(VerifyPasswordTokenRequest request) {
        String code = request.getToken();
        PasswordResetToken passwordResetToken = passwordResetTokenRepository
                .findByToken(code)
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_RESET_PASSWORD));
        boolean valid = passwordResetToken.getUser().getEmail().equals(request.getUsername())
                && passwordResetToken.getExpiryDate().after(new Date());
        String token = generateToken(passwordResetToken.getUser());
        return VerifyPasswordResponse.builder().token(token).valid(valid).build();
    }

    public String confirmChangePassword(ConfirmChangePasswordRequest request) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user =
                userRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        user.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(user);
        return "Success";
    }

    public String changePassword(ChangPasswordRequest request) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository
                .findByUsername(username)
                .or(() -> userRepository.findByEmail(username))
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
            throw new AppException(ErrorCode.PASSWORD_NOT_MATCH);
        }
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
        return "Success";
    }

    public PasswordResetToken getByToken(String token) {
        return passwordResetTokenRepository
                .findByToken(token)
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_RESET_PASSWORD));
    }

    public void deleteToken(PasswordResetToken token) {
        passwordResetTokenRepository.delete(token);
    }

    private String generateString(int length) {
        String digits = "0123456789";
        Random random = new Random();
        StringBuilder builder = new StringBuilder();
        for (int i = 0; i < length; i++) {
            int index = random.nextInt(digits.length());
            builder.append(digits.charAt(index));
        }
        return builder.toString();
    }

    public String generateToken(User user) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);
        JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                .subject(user.getUsername())
                .issuer("Chess PBL4")
                .issueTime(new Date())
                .expirationTime(new Date(
                        Instant.now().plus(VALID_DURATION, ChronoUnit.SECONDS).toEpochMilli()))
                .jwtID(UUID.randomUUID().toString())
                .claim("scope", buildScope(user))
                .build();
        Payload payload = new Payload(claimsSet.toJSONObject());
        JWSObject jwsObject = new JWSObject(header, payload);
        try {
            jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            log.error("Cannot create token", e);
            throw new RuntimeException(e);
        }
    }

    private String buildScope(User user) {
        StringJoiner stringJoiner = new StringJoiner(" ");
        if (!CollectionUtils.isEmpty(user.getRoles())) {
            user.getRoles().forEach(role -> {
                stringJoiner.add("ROLE_" + role.getName());
            });
        }
        return stringJoiner.toString();
    }
}
