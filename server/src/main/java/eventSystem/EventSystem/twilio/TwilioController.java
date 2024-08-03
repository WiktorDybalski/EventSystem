package eventSystem.EventSystem.twilio;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.validation.Valid;

@Controller
@AllArgsConstructor
@RequestMapping( "/api/v1/sms")
public class TwilioController {

    private final TwilioService twilioService;

    @PostMapping("/send")
    public ResponseEntity<String> sendSms(@Valid @RequestBody SmsRequest smsRequest) {
        return twilioService.sendSms(smsRequest);
    }
}
