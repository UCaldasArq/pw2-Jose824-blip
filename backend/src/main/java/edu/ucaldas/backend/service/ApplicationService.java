package edu.ucaldas.backend.service;

import edu.ucaldas.backend.dto.ApplicationDTO;
import edu.ucaldas.backend.entity.Application;
import edu.ucaldas.backend.exception.ResourceNotFoundException;
import edu.ucaldas.backend.mapper.ApplicationMapper;
import edu.ucaldas.backend.repository.ApplicationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final ApplicationMapper applicationMapper;

    public List<ApplicationDTO> getAllApplications() {
        return applicationRepository.findAll().stream()
                .map(applicationMapper::toDTO)
                .collect(Collectors.toList());
    }

    public ApplicationDTO getApplicationById(Long id) {
        Application application = applicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with id: " + id));
        return applicationMapper.toDTO(application);
    }

    public ApplicationDTO createApplication(ApplicationDTO applicationDTO) {
        Application application = applicationMapper.toEntity(applicationDTO);
        Application savedApplication = applicationRepository.save(application);
        return applicationMapper.toDTO(savedApplication);
    }

    public ApplicationDTO updateApplication(Long id, ApplicationDTO applicationDTO) {
        Application existingApplication = applicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with id: " + id));
        
        existingApplication.setName(applicationDTO.getName());
        existingApplication.setCategory(applicationDTO.getCategory());
        
        Application updatedApplication = applicationRepository.save(existingApplication);
        return applicationMapper.toDTO(updatedApplication);
    }

    public void deleteApplication(Long id) {
        if (!applicationRepository.existsById(id)) {
            throw new ResourceNotFoundException("Application not found with id: " + id);
        }
        applicationRepository.deleteById(id);
    }
}
