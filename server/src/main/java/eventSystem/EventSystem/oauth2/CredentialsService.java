package eventSystem.EventSystem.oauth2;

import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.jwk.source.RemoteJWKSet;
import com.nimbusds.jose.proc.JWSKeySelector;
import com.nimbusds.jose.proc.JWSVerificationKeySelector;
import com.nimbusds.jose.proc.SecurityContext;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.proc.ConfigurableJWTProcessor;
import com.nimbusds.jwt.proc.DefaultJWTProcessor;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.net.URL;

@Service
@AllArgsConstructor
public class CredentialsService {

    public String extractEmailFromToken(String token) throws Exception {
        JWTClaimsSet claims = getClaims(token);
        return claims.getStringClaim("email");
    }

    public String extractNameFromToken(String token) throws Exception {
        JWTClaimsSet claims = getClaims(token);
        return claims.getStringClaim("name");
    }

    private JWTClaimsSet getClaims(String token) throws Exception {
        ConfigurableJWTProcessor<SecurityContext> jwtProcessor = new DefaultJWTProcessor<>();
        JWKSource<SecurityContext> keySource = new RemoteJWKSet<>(new URL("https://www.googleapis.com/oauth2/v3/certs"));
        JWSKeySelector<SecurityContext> keySelector = new JWSVerificationKeySelector<>(com.nimbusds.jose.JWSAlgorithm.RS256, keySource);
        jwtProcessor.setJWSKeySelector(keySelector);
        SecurityContext ctx = null;
        return jwtProcessor.process(token, ctx);
    }
}
