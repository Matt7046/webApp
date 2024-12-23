package com.webapp.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.webapp.dto.ResponseDTO;
import com.webapp.mapper.PointsMapper;
import com.webapp.data.Points;
import com.webapp.dto.ActivityDTO;
import com.webapp.dto.PointsDTO;
import com.webapp.service.PointsService;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@CrossOrigin(origins = "https://webapp-tn6q.onrender.com")
@RequestMapping("api/points")
public class PointsController {

    @Autowired
    private PointsService pointsService;

    @PostMapping("")
    public ResponseDTO findByEmail(@RequestBody PointsDTO pointsDTO) {
        List<String> errori = new ArrayList<>();
        Points item = null; // Inizializza l'oggetto come null
        ResponseDTO responseDTO;

        try {
            // Tentativo di trovare il documento
            item = pointsService.findByEmail(pointsDTO.getEmail());
            if (item == null) {
                throw new RuntimeException("Documento non trovato con identificativo: " + pointsDTO.getEmail());
            }
        } catch (Exception e) {
            // Gestione dell'errore: log e aggiunta dei dettagli
            errori.add("Errore: " + e.getMessage());
        }

        if (item != null) {
            // Mappatura se l'oggetto è stato trovato
            PointsDTO subDTO = PointsMapper.INSTANCE.toDTO(item);
            subDTO.setNumeroPunti("I Points a disposizione sono: ".concat(subDTO.getPoints().toString()));
            responseDTO = new ResponseDTO(subDTO, HttpStatus.OK, new ArrayList<>());
        } else {
            // Risposta in caso di errore o elemento non trovato
            ActivityDTO subDTO = new ActivityDTO(); // Inizializza DTO vuoto
            responseDTO = new ResponseDTO(subDTO, HttpStatus.NOT_FOUND, errori); // 404 con dettagli errore
        }

        return responseDTO;
    }

    @PostMapping("/dati")
    public ResponseEntity<ResponseDTO> savePoints(@RequestBody PointsDTO pointsDTO) {
        try {
            // Salva i dati e ottieni l'ID o l'oggetto salvato
            String itemId = pointsService.savePoints(pointsDTO);

            // Crea una risposta
            ResponseDTO response = new ResponseDTO(itemId, HttpStatus.OK, new ArrayList<>());

            // Ritorna una ResponseEntity con lo status HTTP
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            // Gestione degli errori: puoi personalizzarlo in base al tuo scenario
            List<String> errori = new ArrayList<>();
            errori.add(e.getMessage());
            errori.add(e.getLocalizedMessage());
            ResponseDTO errorResponse = new ResponseDTO(null, HttpStatus.INTERNAL_SERVER_ERROR, errori);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
}
