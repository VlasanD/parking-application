package com.parking.security.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
public class Parking {
    @Id
    @SequenceGenerator(
            name = "parking_sequence",
            sequenceName = "parking_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "parking_sequence"
    )
    private Long id;
    private String name;
    private Double latitude;
    private Double longitude;
    private String district;
    private String imageUrl;
    private int parkingLots;
    private double price;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "parking")
    private List<Ticket> tickets;
}
