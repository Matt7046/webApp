package com.webapp.repository.LogAttivita;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;

public class LogActivityCustomRepositoryImpl implements LogActivityCustomRepository {

	@Lazy
	@Autowired
	private LogActivityRepository logAttivitaRepository;


}