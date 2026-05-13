package edu.ucaldas.backend.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsageRecordDTO {
    private Long id;
    private Long userId;
    private String username;
    private Long applicationId;
    private String applicationName;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Long durationInMinutes;
}
