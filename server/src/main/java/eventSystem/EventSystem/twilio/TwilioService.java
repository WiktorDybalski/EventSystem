package eventSystem.EventSystem.twilio;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class TwilioService {
    private final SmsSender twilioSmsSender;

    public ResponseEntity<String> sendSms(SmsRequest smsRequest) {
        try {
            twilioSmsSender.sendSms(smsRequest);
            return ResponseEntity.ok("SMS sent successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("SMS failed to send");
        }
    }
}
