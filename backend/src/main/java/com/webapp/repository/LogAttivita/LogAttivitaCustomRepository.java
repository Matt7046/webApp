package com.webapp.repository.LogAttivita;

import java.util.List;
import com.webapp.data.LogAttivita;

public interface LogAttivitaCustomRepository {
    // Puoi aggiungere metodi personalizzati se necessario
    
    public List<LogAttivita> findLogByEmail(String email);

}