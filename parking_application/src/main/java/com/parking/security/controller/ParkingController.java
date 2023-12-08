package com.parking.security.controller;

import com.parking.security.service.ParkingService;
import com.parking.security.dto.response.ParkingResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping(path = "api/parking")
public class ParkingController {

    private final ParkingService parkingService;

    @GetMapping()
    public ResponseEntity<List<ParkingResponse>> getAvailableParkingByDistrict(@RequestParam String district) {
        return ResponseEntity.ok(parkingService.getAvailableParkingByDistrict(district));
    }
}

