package eventSystem.EventSystem.googleUrls;

import org.springframework.stereotype.Service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Service
public class GoogleUrlService {

    private static final String GOOGLE_MAPS_URL_TEMPLATE = "https://www.google.com/maps/search/?api=1&query=%s";

    public String generateUrl(String location) {
        String encodedLocation = URLEncoder.encode(location, StandardCharsets.UTF_8);
        return String.format(GOOGLE_MAPS_URL_TEMPLATE, encodedLocation);
    }
}
