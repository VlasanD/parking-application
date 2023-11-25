package com.parking.security.controller;

import com.parking.security.Service.TicketService;
import com.parking.security.dto.request.TicketRequest;
import com.parking.security.dto.response.TicketResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@Controller
@RequestMapping(path = "api/ticket")
public class TicketController {
    TicketService ticketService;

    @GetMapping(path = "{id}")
    public List<TicketResponse> findAllByCustomerId(@PathVariable("id") Long id) {
        return ticketService.findAllByCustomerId(id);
    }

    @PostMapping(path = "/add")
    public TicketResponse addTicket(@RequestBody TicketRequest ticketRequest) {
        return ticketService.addTicket(ticketRequest);
    }

}
