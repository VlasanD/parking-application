package com.parking.security.controller;

import com.parking.security.Service.ParkingService;
import com.parking.security.dto.response.ParkingResponse;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping(path = "api/parking")
public class ParkingController {

    private final ParkingService parkingService;

    @GetMapping(path = "{district}")
    public List<ParkingResponse> getAvailableParkingByDistrict(@PathVariable("district") String district) {
        return parkingService.getAvailableParkingByDistrict(district);
    }
}

