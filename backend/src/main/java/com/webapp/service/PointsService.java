package com.webapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.webapp.EncryptDecryptConverter;
import com.webapp.data.LogActivity;
import com.webapp.data.Points;
import com.webapp.dto.PointsDTO;
import com.webapp.mapper.PointsMapper;
import com.webapp.repository.LogAttivita.LogActivityRepository;
import com.webapp.repository.Points.PointsRepository;

import java.util.List;

@Service
public class PointsService {
    @Autowired
    private PointsRepository pointsRepository;
    @Autowired
    private LogActivityRepository logAttivitaRepository;
    @Autowired
    EncryptDecryptConverter encryptDecryptConverter;

    public List<Points> findAll() {
        return pointsRepository.findAll();
    }

    public Points findByEmail(String identificativo) {

        return pointsRepository.findByEmail(identificativo);
    }

    public String savePoints(PointsDTO pointsDTO) throws Exception {
        return pointsRepository.savePoints(pointsDTO);
    }

    public Points save(PointsDTO pointsDTO) throws Exception {
        Points subDTO = PointsMapper.INSTANCE.fromDTO(pointsDTO);

        return pointsRepository.save(subDTO);
    }

    public List<LogActivity> logAttivitaByEmail(PointsDTO pointsDTO, Sort sort) {
        return logAttivitaRepository.findLogByEmail(encryptDecryptConverter.convert(pointsDTO.getEmail()), sort);
    }

}
