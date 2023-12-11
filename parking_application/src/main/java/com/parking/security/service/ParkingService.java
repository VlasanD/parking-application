package com.parking.security.service;

import com.parking.security.dto.response.ParkingResponse;

import java.util.List;

public interface ParkingService {
    List<ParkingResponse> getAvailableParkingByDistrict(String district);
}
