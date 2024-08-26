package eventSystem.EventSystem.twilio;

import com.twilio.rest.api.v2010.account.Message;
import com.twilio.rest.api.v2010.account.MessageCreator;
import com.twilio.type.PhoneNumber;
import eventSystem.EventSystem.config.TwilioConfig;
import eventSystem.EventSystem.user.User;
import eventSystem.EventSystem.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TwilioSmsSender implements SmsSender {

    private final TwilioConfig twilioConfig;
    private final UserRepository userRepository;

    private String getPhoneNumber(SmsRequest smsRequest) {
        User user = userRepository.findByEmail(smsRequest.getUserEmail())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return user.getPhoneNumber();
    }

    private String formatPhoneNumber(String phoneNumber) {
        if (!phoneNumber.startsWith("+")) {
            return "+48" + phoneNumber;
        }
        return phoneNumber;
    }

    @Override
    public void sendSms(SmsRequest smsRequest) {
        String phoneNumber = formatPhoneNumber(this.getPhoneNumber(smsRequest));
        PhoneNumber to = new PhoneNumber(phoneNumber);
        PhoneNumber from = new PhoneNumber(twilioConfig.getTrialNumber());
        String message = smsRequest.getMessage();
        MessageCreator messageCreator = Message.creator(to, from, message);
        messageCreator.create();
    }
}
