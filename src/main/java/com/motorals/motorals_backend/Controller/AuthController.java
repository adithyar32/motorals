package com.motorals.motorals_backend.Controller;

import com.motorals.motorals_backend.DTO.AuthRequest;
import com.motorals.motorals_backend.DTO.AuthResponse;
import com.motorals.motorals_backend.DTO.RegisterRequest;
import com.motorals.motorals_backend.Service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request)
    {
        AuthResponse response=authService.register(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request)
    {
        AuthResponse response=authService.authenticate(request);
        return ResponseEntity.ok(response);
    }
}
