package com.parking.security.service;

import com.parking.security.dto.request.TicketRequest;
import com.parking.security.dto.response.TicketResponse;
import com.parking.security.model.Parking;

import java.time.LocalDateTime;
import java.util.List;

public interface TicketService {
    List<TicketResponse> findAllByCustomerEmail(String email);
    TicketResponse addTicket(TicketRequest ticketRequest, String customerEmail);
}
