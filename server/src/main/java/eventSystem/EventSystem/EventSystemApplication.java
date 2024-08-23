package eventSystem.EventSystem;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EventSystemApplication {

    public static void main(String[] args) {
        Dotenv dotenv = Dotenv.configure().directory("server").load();
        dotenv.entries().forEach(entry -> System.setProperty(entry.getKey(), entry.getValue()));
        SpringApplication.run(EventSystemApplication.class, args);
    }
}
