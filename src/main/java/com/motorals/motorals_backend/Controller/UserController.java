package com.motorals.motorals_backend.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @GetMapping("/profile")
    public String getProfile()
    {
        return "user profile!!Usercontroller successfull";
    }

    @GetMapping("/bookings")
    public String getUserBookings()
    {
        return "User bookings controller successfull!!";
    }
}
