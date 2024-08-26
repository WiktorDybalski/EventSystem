package eventSystem.EventSystem.oauth2;

import eventSystem.EventSystem.config.JwtService;
import eventSystem.EventSystem.user.Role;
import eventSystem.EventSystem.user.User;
import eventSystem.EventSystem.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@AllArgsConstructor
public class OAuth2LoginService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final CredentialsService credentialsService;

    public ResponseEntity<Map<String, String>> loginWithGoogle(Map<String, String> payload) {

        String token = payload.get("token");
        System.out.println("token = " + token);
        try {
            String email = credentialsService.extractEmailFromToken(token);
            String name = credentialsService.extractNameFromToken(token);

            System.out.println("email = " + email);
            System.out.println("name = " + name);

            if (email == null || name == null) {
                return ResponseEntity.status(401).body(Map.of("error", "Invalid Google token"));
            }

            User user = userRepository.findByEmail(email).orElse(null);
            if (user == null) {
                user = new User();
                user.setEmail(email);
                user.setFirstname(name.split(" ")[0]);
                user.setLastname(name.split(" ").length > 1 ? name.split(" ")[1] : "");
                user.setRole(Role.USER);
                userRepository.save(user);
            }

            String jwtToken = jwtService.generateToken(user);

            return ResponseEntity.ok(Map.of("email", email, "token", jwtToken));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid Google token"));
        }
    }
}
