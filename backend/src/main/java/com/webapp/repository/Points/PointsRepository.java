package com.webapp.repository.Points;




import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import com.webapp.data.Points;

public interface PointsRepository extends MongoRepository<Points, String>, PointsCustomRepository {
    // Puoi aggiungere metodi personalizzati se necessario
     List<Points>  findAll();

     @Query("{'email': ?0, 'type': ?1}")
    Points findByEmail(String email, Long type);

    @Query("{'emailfamily': ?0, 'email': ?1}")
    Points findByEmailFamilyAndEmail(String emailFamily, String email);

    
    @Query("{'email': ?0}")
    List<Points>  findFamilyEmailByEmail(String email);
       
       
}