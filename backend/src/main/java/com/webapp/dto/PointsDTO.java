package com.webapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // Genera getter, setter, toString, equals e hashCode
@NoArgsConstructor // Genera un costruttore senza argomenti
@AllArgsConstructor // Genera un costruttore con tutti i campi
public class PointsDTO {

	private String _id; // Identificatore unico
	private String email;
	private String emailFamily;
	private Long points;
	private Long type;
	private String numeroPunti;
	private String attivita;
	private Long usePoints;

	public void generaAttivita(String[] attivitaSvolte) {
    	 setAttivita(attivitaSvolte.toString()
                 .replace("[", "[\"")
                 .replace("]", "\"]")
                 .replace(", ", "\", \""));
    }
	

}
