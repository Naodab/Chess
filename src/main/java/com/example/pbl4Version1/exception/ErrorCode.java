package com.example.pbl4Version1.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

import lombok.Getter;

@Getter
public enum ErrorCode {
    UNCLASSIFIABLE(9999, "UNKOWN ERROR", HttpStatus.INTERNAL_SERVER_ERROR),
    INVALID_KEY(1001, "Uncategorized Error", HttpStatus.BAD_REQUEST),
    USER_EXISTED(1002, "User existed", HttpStatus.BAD_REQUEST),
    USERNAME_INVALID(1003, "Username must be at least {min} characters", HttpStatus.BAD_REQUEST),
    INVALID_PASSWORD(1004, "Password must be at least {min} characters", HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED(1005, "User not existed", HttpStatus.NOT_FOUND),
    UNAUTHENTICATED(1006, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1007, "You do not have permission", HttpStatus.FORBIDDEN),
    ROOM_NOT_EXISTED(1009, "Room not existed.", HttpStatus.BAD_REQUEST),
    EMAIL_EXISTED(1010, "Email existed.", HttpStatus.BAD_REQUEST),
    INVALID_RESET_PASSWORD(1011, "Code is incorrect.", HttpStatus.BAD_REQUEST),
    MATCH_NOT_EXISTED(1012, "Match not existed.", HttpStatus.BAD_REQUEST),
    PASSWORD_NOT_MATCH(1013, "Password does not match.", HttpStatus.BAD_REQUEST),
    ROOM_HAD_PLAYER(1014, "Room had a player.", HttpStatus.BAD_REQUEST);

    private final int code;
    private final String message;
    private final HttpStatusCode httpStatusCode;

    ErrorCode(int code, String message, HttpStatusCode httpStatusCode) {
        this.code = code;
        this.message = message;
        this.httpStatusCode = httpStatusCode;
    }
}
