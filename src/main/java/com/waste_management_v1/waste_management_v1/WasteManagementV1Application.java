package com.waste_management_v1.waste_management_v1;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class WasteManagementV1Application {
	@Bean
	public WebMvcConfigurer webMvcConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {

				registry
						.addMapping("/**")
						.allowedOrigins("*", "http://127.0.0.1", "http://example.org", "http://localhost", "http://localhost:5500")
						.allowedHeaders("*")
						.allowedMethods("POST", "GET", "PUT", "PATCH", "OPTIONS");
			}
		};
	}


	public static void main(String[] args) {
		SpringApplication.run(WasteManagementV1Application.class, args);
	}

}
