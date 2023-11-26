package com.parking.security.controller;

import com.parking.security.service.TicketService;
import com.parking.security.dto.request.TicketRequest;
import com.parking.security.dto.response.TicketResponse;
import com.parking.security.service.security.JwtService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@Controller
@RequestMapping(path = "api/ticket")
@CrossOrigin(originPatterns = "*")
public class TicketController {
    TicketService ticketService;
    JwtService jwtService;
    @GetMapping()
    public ResponseEntity<List<TicketResponse>> findAllByCustomerId(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        String token = authorizationHeader.replace("Bearer ", "");
        String email = jwtService.extractUsername(token);
        return ResponseEntity.ok(ticketService.findAllByCustomerEmail(email));
    }

    @PostMapping(path = "/add")
    public ResponseEntity<TicketResponse> addTicket(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader,
            @RequestBody TicketRequest ticketRequest) {
        String token = authorizationHeader.replace("Bearer ", "");
        String email = jwtService.extractUsername(token);
        return ResponseEntity.ok(ticketService.addTicket(ticketRequest, email));
    }

}
