package com.motorals.motorals_backend.Service;

import com.motorals.motorals_backend.DTO.AuthRequest;
import com.motorals.motorals_backend.DTO.AuthResponse;
import com.motorals.motorals_backend.DTO.RegisterRequest;
import com.motorals.motorals_backend.Entity.Role;
import com.motorals.motorals_backend.Entity.User;
import com.motorals.motorals_backend.Repository.UserRepository;
import com.motorals.motorals_backend.Security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    //register
    public AuthResponse register(RegisterRequest request)
    {
        if (userRepository.existsByEmail(request.getEmail()))
        {
            throw new RuntimeException("User already exists!!!");
        }

        User user=new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);
        //save in db
        userRepository.save(user);

        String token=jwtService.generateToken(user);
        return new AuthResponse(token,user.getName(),user.getRole().name());

    }

    //login
    public AuthResponse authenticate(AuthRequest request)
    {
        Authentication authentication= authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),request.getPassword()
                )
        );

        //get from db
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Profile doesnt exist"));

        String token=jwtService.generateToken(user);

        return new AuthResponse(token, user.getName(), user.getRole().name());
    }
}
