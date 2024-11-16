package com.example.pbl4Version1.configuration;

import java.util.HashSet;

import com.example.pbl4Version1.constant.PredefinedAchievement;
import com.example.pbl4Version1.repository.AchievementRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.pbl4Version1.constant.PredefinedRole;
import com.example.pbl4Version1.entity.Role;
import com.example.pbl4Version1.entity.User;
import com.example.pbl4Version1.repository.RoleRepository;
import com.example.pbl4Version1.repository.UserRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AppInitConfig {
	private static final String ADMIN_USERNAME = "admin";
	private static final String DEFAULT_PASSWORD = "adminadmin";
	PasswordEncoder passwordEncoder;
	
	@Bean
	ApplicationRunner applicationRunner(UserRepository userRepository,
										AchievementRepository achievementRepository,
										RoleRepository roleRepository) {
		return args -> {
			log.info("Initializing application.....");
			if (!userRepository.existsByUsername(ADMIN_USERNAME)) {
				roleRepository.save(Role.builder()
						.name(PredefinedRole.USER_ROLE)
						.description("role user")
						.build());
				
				Role adminRole = roleRepository.save(Role.builder()
						.name(PredefinedRole.ADMIN_ROLE)
						.description("role admin")
						.build());
				
				User user = User.builder()
						.username(ADMIN_USERNAME)
						.password(passwordEncoder.encode(DEFAULT_PASSWORD))
						.build();
				
				var roles = new HashSet<Role>();
				roles.add(adminRole);
				user.setRoles(roles);
				userRepository.save(user);
				achievementRepository.saveAll(PredefinedAchievement.predefinedAchievements());

				log.warn("admin user has been created with default password: admin, please change it");
			}
			log.info("Initializing completed......");
		};
	}
}
