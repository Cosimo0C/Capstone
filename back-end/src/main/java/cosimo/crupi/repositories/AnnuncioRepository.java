package cosimo.crupi.repositories;

import cosimo.crupi.entities.Annuncio;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AnnuncioRepository extends JpaRepository<Annuncio, UUID> {
    Page<Annuncio> findByUtenteId(UUID utenteId, Pageable pageable);
}
