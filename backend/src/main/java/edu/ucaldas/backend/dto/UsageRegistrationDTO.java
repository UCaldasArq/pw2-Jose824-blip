package edu.ucaldas.backend.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsageRegistrationDTO {
    @NotNull(message = "User ID is required")
    private Long userId;

    @NotNull(message = "Application ID is required")
    private Long applicationId;

    @NotNull(message = "Start time is required")
    private LocalDateTime startTime;

    @NotNull(message = "End time is required")
    private LocalDateTime endTime;
}
