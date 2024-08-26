package eventSystem.EventSystem.ticket;

import eventSystem.EventSystem.event.Event;
import eventSystem.EventSystem.event.EventRepository;
import eventSystem.EventSystem.user.User;
import eventSystem.EventSystem.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class TicketService {

    private final TicketRepository ticketRepository;
    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    public List<TicketDto> getTicketsForUser(String userEmail) {
        return ticketRepository.findAllTicketsWithEventByUserId(userEmail);
    }

    public void purchaseTicket(Integer eventId, String email) {
        Event event = eventRepository.findById(eventId).orElseThrow(() -> new RuntimeException("Event not found"));
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        Ticket ticket = Ticket.builder()
                .event(event)
                .user(user)
                .build();

        ticketRepository.save(ticket);
    }
}
