package cosimo.crupi.back_end.repositories;

import cosimo.crupi.back_end.entities.Annuncio;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface AnnuncioRepository extends JpaRepository<Annuncio, UUID> {
    List<Annuncio> findByUtenteId(UUID utenteId);
}
