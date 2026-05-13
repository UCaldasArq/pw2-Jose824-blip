package edu.ucaldas.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApplicationDTO {
    private Long id;

    @NotBlank(message = "Application name is required")
    private String name;

    @NotBlank(message = "Category is required")
    private String category;
}
