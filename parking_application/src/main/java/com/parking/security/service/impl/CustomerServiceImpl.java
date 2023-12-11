package com.parking.security.service.impl;

import com.parking.security.repository.CustomerRepository;
import com.parking.security.service.CustomerService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class CustomerServiceImpl implements CustomerService {
    private final CustomerRepository customerRepository;

    // TODO update customer
    @Transactional
    public void updateCustomer() {
    }

}

