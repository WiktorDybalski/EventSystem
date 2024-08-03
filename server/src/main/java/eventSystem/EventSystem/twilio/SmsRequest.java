package eventSystem.EventSystem.twilio;

import com.fasterxml.jackson.annotation.JsonProperty;
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

    public SmsRequest(@JsonProperty("email") String userEmail,
                      @JsonProperty("message") String message) {
        this.userEmail = userEmail;
        this.message = message;
    }
}
