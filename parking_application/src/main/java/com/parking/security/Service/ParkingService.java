package com.parking.security.Service;

import com.parking.security.dto.response.ParkingResponse;
import com.parking.security.model.Parking;
import com.parking.security.repository.ParkingRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class ParkingService {
    private final ParkingRepository parkingRepository;

    // TODO filter so that it only shows available parking lots
    public List<ParkingResponse> getAvailableParkingByDistrict(String district) {
        List<Parking> parkingList = parkingRepository.findByDistrict(district)
                .orElseThrow(() -> new IllegalStateException("No parking lots in the district"));
        return parkingList
                .stream()
                .map(parking ->
                        ParkingResponse
                                .builder()
                                .id(parking.getId())
                                .name(parking.getName())
                                .latitude(parking.getLatitude())
                                .longitude(parking.getLongitude())
                                .district(parking.getDistrict())
                                .imageUrl(parking.getImageUrl())
                                .parkingLots(parking.getParkingLots())
                                .price(parking.getPrice())
                                .build())
                .collect(Collectors.toList());
    }
}
