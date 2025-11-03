package cosimo.crupi.repositories;

import cosimo.crupi.entities.Annuncio;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface AnnuncioRepository extends JpaRepository<Annuncio, UUID> {
    Page<Annuncio> findByUtenteId(UUID utenteId, Pageable pageable);
    @Query("""
        SELECT a FROM Annuncio a
        WHERE LOWER(a.titolo) LIKE LOWER(CONCAT('%', :search, '%'))
           OR LOWER(a.auto.marca) LIKE LOWER(CONCAT('%', :search, '%'))
           OR LOWER(a.auto.modello) LIKE LOWER(CONCAT('%', :search, '%'))
           OR LOWER(a.auto.anno) LIKE LOWER(CONCAT('%', :search, '%'))
           OR CAST(a.auto.potenza AS string) LIKE CONCAT('%', :search, '%')
           OR LOWER(a.auto.cambio) LIKE LOWER(CONCAT('%', :search, '%'))
           OR LOWER(a.auto.carburante) LIKE LOWER(CONCAT('%', :search, '%'))
           OR CAST(a.auto.chilometri AS string) LIKE CONCAT('%', :search, '%')
    """)
    Page<Annuncio> searchAnnunci(@Param("search") String search, Pageable pageable);
}
