package eventSystem.EventSystem.ticket;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, String> {
    @Query("SELECT new eventSystem.EventSystem.ticket.TicketDto(t.id, e.id, u.id, e.name, e.startDate, e.endDate, e.location) " +
            "FROM Ticket t JOIN t.event e JOIN t.user u WHERE u.email = :UserEmail")
    List<TicketDto> findAllTicketsWithEventByUserId(String UserEmail);
}
