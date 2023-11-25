package com.parking.security.config;

import com.parking.security.model.Customer;
import com.parking.security.model.Parking;
import com.parking.security.model.Ticket;
import com.parking.security.repository.CustomerRepository;
import com.parking.security.repository.ParkingRepository;
import com.parking.security.repository.TicketRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;
import java.util.List;

@Configuration
public class StartupConfig {
    @Bean
    CommandLineRunner commandLineRunner(ParkingRepository parkingRepository, CustomerRepository customerRepository, TicketRepository ticketRepository) {
        return args -> {
            //TODO make parking with builder for example:
            Parking p1 = Parking
                    .builder()
                    .name("ana")
                    .build();
            // TODO save the list of parking
            List<Parking> parkingListFromDb = parkingRepository.saveAll(List.of(p1));

            // TODO customer with builder
            Customer c1 = Customer
                    .builder()
                    .email("ana@gmail.com")
                    .build();
            // TODO save the list of parking
            List<Customer> customerListFromDb = customerRepository.saveAll(List.of(c1));

            // TODO ticket with builder (use a customer from Db)
            Ticket t1 = Ticket
                    .builder()
                    .dataIn(LocalDateTime.now())
                    .parking(parkingListFromDb.get(0))
                    .customer(customerListFromDb.get(0))
                    .build();
            // TODO save the list of tickets
            ticketRepository.saveAll(List.of(t1));
        };
    }
}

