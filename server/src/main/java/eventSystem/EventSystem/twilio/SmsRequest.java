package eventSystem.EventSystem.twilio;

import lombok.Data;
import lombok.NoArgsConstructor;
import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
public class SmsRequest {

    @NotBlank
    private String userEmail;

    @NotBlank
    private String message;
}
