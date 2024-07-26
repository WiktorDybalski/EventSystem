package eventSystem.EventSystem.WebSocket;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
public class ChatMessage {

    private String content;
    private String sender;
    private MessageType type;
}
