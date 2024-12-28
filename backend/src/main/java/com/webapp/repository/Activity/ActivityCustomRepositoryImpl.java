package com.webapp.repository.Activity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;

import com.webapp.data.Activity;
import com.webapp.dto.ActivityDTO;

public class ActivityCustomRepositoryImpl implements ActivityCustomRepository {

    @Lazy
    @Autowired
    private ActivityRepository ActivityRepository;

    public String saveActivity(Activity activity) {
        // Verifica se esiste già un documento con l'identificativo
        Activity existingActivity = null;
        if (activity.get_id() != null) {
            existingActivity = ActivityRepository.findByIdentificativo(activity.get_id());
        }

        if (existingActivity != null) {
            activity.setNome(activity.getNome());
            activity.setSubTesto(activity.getSubTesto());
            activity.setPoints(activity.getPoints());
            existingActivity = ActivityRepository.save(activity);

            return existingActivity.get_id();// Restituisci l'ID aggiornato
        } else {
            activity = ActivityRepository.save(activity);
            return activity.get_id(); // Restituisci l'ID del nuovo documento
        }
    }
}