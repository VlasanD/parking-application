package com.parking.security.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TicketResponse {
    private LocalDateTime dataIn;
    private LocalDateTime dataOut;
    private String parkingName;
    private double price;
}
