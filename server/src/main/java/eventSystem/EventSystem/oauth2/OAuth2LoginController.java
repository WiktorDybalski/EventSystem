package eventSystem.EventSystem.oauth2;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth/oauth2")
@RequiredArgsConstructor
public class OAuth2LoginController {

    private final OAuth2LoginService service;

    @PostMapping("/google")
    public ResponseEntity<Map<String, String>> loginWithGoogle(@RequestBody Map<String, String> payload) {
        return service.loginWithGoogle(payload);
    }
}

