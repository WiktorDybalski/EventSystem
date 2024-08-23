package eventSystem.EventSystem.WebSocket;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChatMessage {

    private String sender;
    private String recipient;
    private String content;
}
