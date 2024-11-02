package com.example.pbl4Version1.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.pbl4Version1.entity.User;
import com.example.pbl4Version1.repository.UserRepository;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CloudinaryService {
    final Cloudinary cloudinary;
    UserRepository userRepository;

    @Autowired
    public CloudinaryService(
            @Value("${cloudinary.cloud_name}") String cloudName,
            @Value("${cloudinary.api_key}") String apiKey,
            @Value("${cloudinary.api_secret}") String apiSecret, UserRepository userRepository) {
        this.userRepository = userRepository;
        cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", cloudName,
                "api_key", apiKey,
                "api_secret", apiSecret
        ));
    }

    public String uploadFile(MultipartFile file) throws IOException {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        String name = authentication.getName();
        User user = userRepository.findByUsername(name).orElseThrow(
                () -> new RuntimeException("User not found")
        );

        Map<String, Object> uploadParams = ObjectUtils.asMap(
                "public_id", "avatar_" + user.getUsername(),
                "overwrite", true
        );
        Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(), uploadParams);
        String url = uploadResult.get("url").toString();
        user.setAvatar(url);
        userRepository.save(user);
        return url;
    }
}
