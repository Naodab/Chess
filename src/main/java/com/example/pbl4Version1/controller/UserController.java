package com.example.pbl4Version1.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.pbl4Version1.dto.request.ForgotRequest;
import com.example.pbl4Version1.dto.request.UserCreateRequest;
import com.example.pbl4Version1.dto.request.UserUpdateRequest;
import com.example.pbl4Version1.dto.response.ApiResponse;
import com.example.pbl4Version1.dto.response.UserResponse;
import com.example.pbl4Version1.entity.PasswordResetToken;
import com.example.pbl4Version1.entity.User;
import com.example.pbl4Version1.exception.AppException;
import com.example.pbl4Version1.service.PasswordResetTokenService;
import com.example.pbl4Version1.service.SendingEmailService;
import com.example.pbl4Version1.service.UserService;

import jakarta.mail.MessagingException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserController {
	UserService userService;
	PasswordResetTokenService passwordResetTokenService;
	SendingEmailService sendingEmailService;
	
	@PostMapping
	public ApiResponse<UserResponse> create(@RequestBody UserCreateRequest request) {
		return ApiResponse.<UserResponse>builder()
				.result(userService.create(request))
				.build();
	}
	
	@GetMapping
	public ApiResponse<List<UserResponse>> getAll() {
		return ApiResponse.<List<UserResponse>>builder()
				.result(userService.getAll())
				.build();
	}
	
	@GetMapping("/{userID}")
	public ApiResponse<UserResponse> getUser(@PathVariable("userID") String userID) {
		return ApiResponse.<UserResponse>builder()
				.result(userService.getUser(userID))
				.build();
	}
	
	@GetMapping("/myInfo")
	public ApiResponse<UserResponse> getMyInfo() {
		return ApiResponse.<UserResponse>builder()
				.result(userService.getMyInfo())
				.build();
	}
	
	@PutMapping("/{userID}")
	public ApiResponse<UserResponse> update(@PathVariable("userID") String userID,
			@RequestBody UserUpdateRequest request) {
		return ApiResponse.<UserResponse>builder()
				.result(userService.update(userID, request))
				.build();
	}
	
	@DeleteMapping("/{userID}")
	public ApiResponse<?> update(@PathVariable("userID") String userID) {
		userService.delete(userID);
		return ApiResponse.builder()
				.message(userID + " has been deleted.")
				.build();
	}
	
	@PostMapping("/forgot")
	public ApiResponse<?> forgotPassword(@RequestBody ForgotRequest request) {
		PasswordResetToken token = passwordResetTokenService.create(request);
		String resetLink = "http://localhost:8080/users/reset?token=" + token.getToken();
        String emailContent = "<p>Click vào link sau để reset mật khẩu:</p>"
                + "<a href=\"" + resetLink + "\">Reset Password</a>";
        
        String result = "Email xác nhận reset mật khẩu đã được gửi!";
        try {
            sendingEmailService.sendHtmlMail(token.getUser().getEmail(), 
            		"Reset mật khẩu", emailContent);
        } catch (MessagingException e) {
        	result = "Không thể gửi";
        }
		return ApiResponse.builder()
				.message(result)
				.build();
	}
	
	@PostMapping("/reset")
    public String resetPassword(@RequestParam String token, @RequestParam String newPassword) {
        PasswordResetToken resetToken = passwordResetTokenService.getByToken(token);

        if (resetToken == null || !passwordResetTokenService.isTokenValid(token)) {
            return "Token không hợp lệ hoặc đã hết hạn!";
        }

        User user = resetToken.getUser();
//        userService.updatePassword(user, newPassword);  // Thực hiện việc cập nhật mật khẩu
        passwordResetTokenService.deleteToken(resetToken);  // Xóa token sau khi đã sử dụng

        return "Mật khẩu đã được đặt lại thành công!";
    }
}
