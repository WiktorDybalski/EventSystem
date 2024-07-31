package eventSystem.EventSystem.ticket;

import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
public class TicketController {

    private final TicketService ticketService;

    @GetMapping("/tickets")
    public List<TicketDto> getTicketsForUser(@RequestParam String email) {
        return ticketService.getTicketsForUser(email);
    }

    @PostMapping("/purchase-ticket")
    public void purchaseTicket(@RequestParam Integer eventId, @RequestParam String email) {
        ticketService.purchaseTicket(eventId, email);
    }

    @PostMapping("/add-to-google-calendar")
    public void addToCalendar(@RequestParam Integer eventId, @RequestParam String email) {
        ticketService.addToCalendar(eventId, email);
    }
}
