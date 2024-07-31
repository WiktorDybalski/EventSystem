package eventSystem.EventSystem.twilio;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class TwilioService {
    private final SmsSender twilioSmsSender;

    public void sendSms(SmsRequest smsRequest) {
        twilioSmsSender.sendSms(smsRequest);
    }
}
