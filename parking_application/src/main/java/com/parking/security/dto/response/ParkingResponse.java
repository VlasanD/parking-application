package com.parking.security.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ParkingResponse {
    private Long id;
    private String name;
    private Double latitude;
    private Double longitude;
    private String district;
    private String imageUrl;
    private int parkingLots;
    private double price;
}
