package eventSystem.EventSystem.ticket;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class TicketService {

    private final TicketRepository ticketRepository;
    public List<TicketDto> getTicketsForUser(String userEmail) {
        return ticketRepository.findAllTicketsWithEventByUserId(userEmail);
    }
}
