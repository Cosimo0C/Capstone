package cosimo.crupi.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebCorsConfig {
    @Bean
    public WebMvcConfigurer corsConfig() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // tutti gli endpoint
                        .allowedOrigins("http://localhost:5173") // front-end React
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // metodi permessi
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }

        };
    }
}