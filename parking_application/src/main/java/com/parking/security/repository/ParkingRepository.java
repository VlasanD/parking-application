package com.parking.security.repository;

import com.parking.security.model.Parking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ParkingRepository extends JpaRepository<Parking, Long> {
    List<Parking> findByDistrict(String district);
}
