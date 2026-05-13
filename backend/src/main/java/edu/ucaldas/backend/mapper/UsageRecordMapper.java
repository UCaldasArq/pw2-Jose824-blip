package edu.ucaldas.backend.mapper;

import edu.ucaldas.backend.dto.UsageRecordDTO;
import edu.ucaldas.backend.entity.UsageRecord;
import org.springframework.stereotype.Component;

@Component
public class UsageRecordMapper {

    public UsageRecordDTO toDTO(UsageRecord record) {
        if (record == null) return null;
        return UsageRecordDTO.builder()
                .id(record.getId())
                .userId(record.getUser().getId())
                .username(record.getUser().getUsername())
                .applicationId(record.getApplication().getId())
                .applicationName(record.getApplication().getName())
                .startTime(record.getStartTime())
                .endTime(record.getEndTime())
                .durationInMinutes(record.getDurationInMinutes())
                .build();
    }
}
