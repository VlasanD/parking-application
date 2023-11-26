package com.parking.security.service;

import com.parking.security.dto.request.TicketRequest;
import com.parking.security.dto.response.TicketResponse;
import com.parking.security.model.Customer;
import com.parking.security.model.Parking;
import com.parking.security.model.Ticket;
import com.parking.security.repository.CustomerRepository;
import com.parking.security.repository.ParkingRepository;
import com.parking.security.repository.TicketRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class TicketService {
    private final TicketRepository ticketRepository;
    private final CustomerRepository customerRepository;
    private final ParkingRepository parkingRepository;

    public List<TicketResponse> findAllByCustomerEmail(String email) {
        List<Ticket> allByCustomerId = ticketRepository.findAllByCustomer_Email(email);

        if (allByCustomerId.isEmpty()) {
            throw new IllegalStateException("No tickets for this customer");
        }

        return allByCustomerId.stream()
                .map(
                        ticket ->
                                TicketResponse
                                        .builder()
                                        .dataIn(ticket.getDataIn())
                                        .dataOut(ticket.getDataOut())
                                        .parkingName(ticket.getParking().getName())
                                        .price(calculatePrice(ticket.getDataIn(), ticket.getDataOut(), ticket.getParking()))
                                        .build())
                .collect(Collectors.toList());
    }

    public TicketResponse addTicket(TicketRequest ticketRequest, String customerEmail) {
        Parking parking = parkingRepository.findById(ticketRequest.getIdParking())
                .orElseThrow(() -> new IllegalStateException("Cannot find the parking"));
        Customer customer = customerRepository.findByEmail(customerEmail)
                .orElseThrow(() -> new IllegalStateException("Cannot find the customer"));
        Ticket ticket = Ticket
                .builder()
                .dataIn(ticketRequest.getDataIn())
                .dataOut(ticketRequest.getDataOut())
                .customer(customer)
                .parking(parking)
                .build();
        Ticket savedTicket = ticketRepository.save(ticket);
        return TicketResponse
                .builder()
                .dataIn(savedTicket.getDataIn())
                .dataOut(savedTicket.getDataOut())
                .parkingName(savedTicket.getParking().getName())
                .price(calculatePrice(savedTicket.getDataIn(), savedTicket.getDataOut(), savedTicket.getParking()))
                .build();
    }

    private double calculatePrice(LocalDateTime arrivingTime, LocalDateTime departureTime, Parking parking) {
        long duration = arrivingTime.until(departureTime, ChronoUnit.HOURS);
        if (duration < 2)
            return 0.5 * parking.getPrice();
        if (duration < 4)
            return 0.8 * parking.getPrice();
        return (duration - 2.7) * parking.getPrice();
    }
}
