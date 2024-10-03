package com.example.pbl4Version1.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

public enum ErrorCode {
	UNCLASSIFIABLE(9999, "UNKOWN ERROR", HttpStatus.INTERNAL_SERVER_ERROR),
	INVALID_KEY(1001, "Uncategorized Error", HttpStatus.BAD_REQUEST),
	USER_EXISTED(1002, "User existed", HttpStatus.BAD_REQUEST),
    USERNAME_INVALID(1003, "Username must be at least {min} characters", HttpStatus.BAD_REQUEST),
    INVALID_PASSWORD(1004, "Password must be at least {min} characters", HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED(1005, "User not existed", HttpStatus.NOT_FOUND),
    UNAUTHENTICATED(1006, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1007, "You do not have permission", HttpStatus.FORBIDDEN),
    INVALID_DOB(1008, "Your age must be at least {min}", HttpStatus.BAD_REQUEST), 
    ROOM_NOTEXISTED(1009, "Room not existed.", HttpStatus.BAD_REQUEST),
    EMAIL_EXISTED(1010, "Email existed.", HttpStatus.BAD_REQUEST), 
    INVALID_RESET_PASSWORD(1011, "Code is incorrect.", HttpStatus.BAD_REQUEST)
	;
	
	private int code;
	private String message;
	private HttpStatusCode httpStatusCode;

	private ErrorCode(int code, String message, HttpStatusCode httpStatusCode) {
		this.code = code;
		this.message = message;
		this.httpStatusCode = httpStatusCode;
	}

	public int getCode() {
		return code;
	}

	public String getMessage() {
		return message;
	}

	public HttpStatusCode getHttpStatusCode() {
		return httpStatusCode;
	}
}
