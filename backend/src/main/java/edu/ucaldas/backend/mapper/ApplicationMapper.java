package edu.ucaldas.backend.mapper;

import edu.ucaldas.backend.dto.ApplicationDTO;
import edu.ucaldas.backend.entity.Application;
import org.springframework.stereotype.Component;

@Component
public class ApplicationMapper {

    public ApplicationDTO toDTO(Application application) {
        if (application == null) return null;
        return ApplicationDTO.builder()
                .id(application.getId())
                .name(application.getName())
                .category(application.getCategory())
                .build();
    }

    public Application toEntity(ApplicationDTO dto) {
        if (dto == null) return null;
        return Application.builder()
                .id(dto.getId())
                .name(dto.getName())
                .category(dto.getCategory())
                .build();
    }
}
