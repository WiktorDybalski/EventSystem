package eventSystem.EventSystem.ticket;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class TicketDto {
    private Integer ticketId;
    private Integer eventId;
    private Integer userId;
    private String eventName;
    private String eventStartDate;
    private String eventEndDate;
    private String eventLocation;
}