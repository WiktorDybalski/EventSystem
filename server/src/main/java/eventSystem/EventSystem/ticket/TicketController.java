package eventSystem.EventSystem.ticket;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user/tickets")
public class TicketController {

    private final TicketService ticketService;

    @GetMapping
    public List<TicketDto> getTicketsForUser(@RequestParam String email) {
        return ticketService.getTicketsForUser(email);
    }
}
