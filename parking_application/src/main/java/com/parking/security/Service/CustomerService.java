package com.parking.security.Service;

import com.parking.security.repository.CustomerRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class CustomerService {
    private final CustomerRepository customerRepository;

    // TODO update customer
    @Transactional
    public void updateCustomer() {
    }

}

