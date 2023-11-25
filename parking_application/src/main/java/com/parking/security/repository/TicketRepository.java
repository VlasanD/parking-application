package com.parking.security.repository;

import com.parking.security.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    Optional<List<Ticket>> findAllByCustomer_Id(Long id);
}
