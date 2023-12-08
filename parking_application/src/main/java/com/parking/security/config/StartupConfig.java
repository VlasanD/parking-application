package com.parking.security.config;

import com.parking.security.model.Customer;
import com.parking.security.model.Parking;
import com.parking.security.model.Ticket;
import com.parking.security.model.enums.Role;
import com.parking.security.repository.CustomerRepository;
import com.parking.security.repository.ParkingRepository;
import com.parking.security.repository.TicketRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.List;

@Configuration
public class StartupConfig {
    @Bean
    CommandLineRunner commandLineRunner(ParkingRepository parkingRepository, CustomerRepository customerRepository, TicketRepository ticketRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            Parking p1 = Parking
                    .builder()
                    .name("Parcare Central")
                    .district("Centru")
                    .latitude(46.773193288157465)
                    .longitude(23.589891681312057)
                    .imageUrl("https://www.interparking.nl/-/media/Netherlands/Images/Central-Plaza/Parkeergarage-Central-Plaza.ashx")
                    .parkingLots(123)
                    .price(3.5)
                    .build();

            Parking p2 = Parking
                    .builder()
                    .name("Parcarea Mihai Viteazul")
                    .district("Centru")
                    .latitude(46.77441736247655)
                    .longitude(23.591196978865202)
                    .imageUrl("https://kadra.ro/wp-content/uploads/2014/09/00044805_large1.jpg")
                    .parkingLots(60)
                    .price(1.5)
                    .build();

            Parking p3 = Parking
                    .builder()
                    .name("Parcarea Mărăști")
                    .district("Mărăști")
                    .latitude(46.778664428145)
                    .longitude(23.61679442549497)
                    .imageUrl("https://gazetadecluj.ro/wp-content/uploads/2015/04/parking-marasti.jpg")
                    .parkingLots(90)
                    .price(2.7)
                    .build();

            Parking p4 = Parking
                    .builder()
                    .name("Parcarea Cipariu")
                    .district("Mărăști")
                    .latitude(46.76843859406398)
                    .longitude(23.598450194802354)
                    .imageUrl("https://www.stiridecluj.ro/files/images/178/489e48143a3af7174a42deb0db6f191c.png")
                    .parkingLots(100)
                    .price(3)
                    .build();

            Parking p5 = Parking
                    .builder()
                    .name("Parcare Mogoșoaia")
                    .district("Mănăștur")
                    .latitude(46.7582346729592)
                    .longitude(23.559310596657276)
                    .imageUrl("https://spotmedia.ro/wp-content/uploads/2020/08/parking-mogo%C8%99oaia-cluj-teren-baschet-zona-verde.jpg")
                    .parkingLots(150)
                    .price(2)
                    .build();

            Parking p6 = Parking
                    .builder()
                    .name("Parcare Minerva")
                    .district("Mănăștur")
                    .latitude(46.75479962778687)
                    .longitude(23.555061500374688)
                    .imageUrl("https://cdn.adh.reperio.news/image-f/f832b27e-410e-48c2-8dda-9b09d3f83a53/index.jpeg?p=a%3D1%26co%3D1.05%26w%3D700%26h%3D735%26r%3Dcontain%26f%3Dwebp")
                    .parkingLots(280)
                    .price(3.8)
                    .build();

            Parking p7 = Parking
                    .builder()
                    .name("Parcare Primăverii 8")
                    .district("Mănăștur")
                    .latitude(46.755763632184966)
                    .longitude(23.554774481311096)
                    .imageUrl("https://files.primariaclujnapoca.ro/comunicate/2020/09/24/parking-primaverii-8-site-PMCJ8029_.jpg")
                    .parkingLots(30)
                    .price(5.5)
                    .build();

            List<Parking> parkingListFromDb = parkingRepository.saveAll(List.of(p1, p2, p3, p4, p5, p6, p7));

            Customer c1 = Customer
                    .builder()
                    .firstName("Ionel")
                    .lastName("Banciu")
                    .email("banciu.ionel@gmail.com")
                    .password(passwordEncoder.encode( "ionelBanciu1234"))
                    .role(Role.USER)
                    .build();

            Customer c2 = Customer
                    .builder()
                    .firstName("Aurora")
                    .lastName("Sîrbu")
                    .email("auroro_sirbu@gmail.com")
                    .password(passwordEncoder.encode("gianinaandrei"))
                    .role(Role.USER)
                    .build();

            Customer c3 = Customer
                    .builder()
                    .firstName("Raul")
                    .lastName("Muntean")
                    .email("muntean.raul@gmail.com")
                    .password(passwordEncoder.encode("raulraul23"))
                    .role(Role.USER)
                    .build();

            List<Customer> customerListFromDb = customerRepository.saveAll(List.of(c1, c2, c3));

            Ticket t1 = Ticket
                    .builder()
                    .dataIn(LocalDateTime.now())
                    .dataOut(LocalDateTime.now())
                    .parking(parkingListFromDb.get(0))
                    .customer(customerListFromDb.get(0))
                    .build();

            Ticket t2 = Ticket
                    .builder()
                    .dataIn(LocalDateTime.now().minusMinutes(30))
                    .dataOut(LocalDateTime.now())
                    .parking(parkingListFromDb.get(1))
                    .customer(customerListFromDb.get(1))
                    .build();

            Ticket t3 = Ticket
                    .builder()
                    .dataIn(LocalDateTime.now().minusMinutes(30).minusDays(3))
                    .dataOut(LocalDateTime.now())
                    .parking(parkingListFromDb.get(3))
                    .customer(customerListFromDb.get(1))
                    .build();

            Ticket t4 = Ticket
                    .builder()
                    .dataIn(LocalDateTime.now().minusWeeks(1).minusMinutes(2))
                    .dataOut(LocalDateTime.now())
                    .parking(parkingListFromDb.get(5))
                    .customer(customerListFromDb.get(0))
                    .build();

            Ticket t5 = Ticket
                    .builder()
                    .dataIn(LocalDateTime.now().minusMinutes(29).minusDays(10))
                    .dataOut(LocalDateTime.now())
                    .parking(parkingListFromDb.get(2))
                    .customer(customerListFromDb.get(2))
                    .build();

            Ticket t6 = Ticket
                    .builder()
                    .dataIn(LocalDateTime.now().minusDays(15).minusHours(2).minusMinutes(23))
                    .dataOut(LocalDateTime.now())
                    .parking(parkingListFromDb.get(6))
                    .customer(customerListFromDb.get(0))
                    .build();

            ticketRepository.saveAll(List.of(t1, t2, t3, t4, t5, t6));
        };
    }
}

