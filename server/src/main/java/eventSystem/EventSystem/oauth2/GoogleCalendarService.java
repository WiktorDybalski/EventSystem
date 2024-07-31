package eventSystem.EventSystem.oauth2;

import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.model.Event;
import com.google.api.services.calendar.model.EventDateTime;
import com.google.auth.http.HttpCredentialsAdapter;
import com.google.auth.oauth2.AccessToken;
import com.google.auth.oauth2.GoogleCredentials;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class GoogleCalendarService {

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String clientSecret;

    @Value("${spring.security.oauth2.client.registration.google.redirect-uri}")
    private String redirectUri;

    private final Map<String, String> tokensStorage = new HashMap<>();

    public void addEventToCalendar(String name, String location, String startDate, String endDate) {
        try {
            JsonFactory jsonFactory = GsonFactory.getDefaultInstance();
            String accessToken = getAccessToken();

            GoogleCredentials credentials = GoogleCredentials.create(new AccessToken(accessToken, new Date()));

            Calendar service = new Calendar.Builder(
                    GoogleNetHttpTransport.newTrustedTransport(),
                    jsonFactory,
                    new HttpCredentialsAdapter(credentials)
            ).setApplicationName("Event System").build();

            Event event = new Event()
                    .setSummary(name)
                    .setLocation(location)
                    .setStart(new EventDateTime().setDateTime(new com.google.api.client.util.DateTime(startDate)))
                    .setEnd(new EventDateTime().setDateTime(new com.google.api.client.util.DateTime(endDate)));

            String calendarId = "primary";
            service.events().insert(calendarId, event).execute();
        } catch (GeneralSecurityException | IOException e) {
            throw new RuntimeException("Failed to add event to Google Calendar", e);
        }
    }

    public void getApiTokens(String code) {
//        String email = credentialsService.extractEmailFromToken(code);
        RestTemplate restTemplate = new RestTemplate();
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("code", code);
        params.add("client_id", clientId);
        params.add("client_secret", clientSecret);
        params.add("redirect_uri", redirectUri);
        params.add("grant_type", "authorization_code");

        System.out.println(code);
        System.out.println(clientId);
        System.out.println(clientSecret);
        System.out.println(redirectUri);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);
        System.out.println(headers);
        System.out.println(request);


        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(
                    "https://oauth2.googleapis.com/token",
                    request,
                    Map.class
            );

            System.out.println("Response Status: " + response.getStatusCode());
            System.out.println("Response Body: " + response.getBody());

            if (response.getStatusCode().is2xxSuccessful()) {
                String accessToken = (String) Objects.requireNonNull(response.getBody()).get("access_token");
                String refreshToken = (String) response.getBody().get("refresh_token");
                System.out.println("5");
                tokensStorage.put("access_token", accessToken);
                tokensStorage.put("refresh_token", refreshToken);

                System.out.println("Access token: " + accessToken);
                System.out.println("Refresh token: " + refreshToken);
                System.out.println("Stored tokens: " + tokensStorage);
            } else {
                throw new RuntimeException("Failed to get API tokens: " + response.getBody());
            }
        } catch (Exception e) {
            System.err.println("Error occurred while fetching API tokens: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public String getAccessToken() {
        return tokensStorage.get("access_token");
    }

    public String getRefreshToken() {
        return tokensStorage.get("refresh_token");
    }
}
