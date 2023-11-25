package com.parking.security.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TicketRequest {
    private Long idParking;
    private String customerEmail;
    private LocalDateTime dataIn;
    private LocalDateTime dataOut;
}
