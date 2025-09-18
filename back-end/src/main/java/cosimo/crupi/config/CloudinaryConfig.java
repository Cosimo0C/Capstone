package cosimo.crupi.config;

import com.cloudinary.Cloudinary;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary getImageUploader(@Value("${cloudinary.name}") String cloudName,
                                       @Value("${cloudinary.key}") String cloudKey,
                                       @Value("${cloudinary.secret}") String cloudSecret){
        Map<String, String> config = new HashMap<>();
        config.put("cloud_name", cloudName);
        config.put("cloud_key", cloudKey);
        config.put("cloud_secret", cloudSecret);
        return new Cloudinary(config);
    }
}
