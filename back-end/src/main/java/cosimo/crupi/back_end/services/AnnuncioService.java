package cosimo.crupi.back_end.services;

import cosimo.crupi.back_end.entities.Annuncio;
import cosimo.crupi.back_end.entities.Auto;
import cosimo.crupi.back_end.entities.Immagine;
import cosimo.crupi.back_end.entities.Utente;
import cosimo.crupi.back_end.exceptions.NotFoundException;
import cosimo.crupi.back_end.payloads.AnnuncioDTO;
import cosimo.crupi.back_end.repositories.AnnuncioRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.UUID;

@Service
@Slf4j
public class AnnuncioService {
    @Autowired
    private AnnuncioRepository annuncioRepository;
    @Autowired
    private UtenteService utenteService;

    public Annuncio findAnnuncioById(UUID annuncioId){
        return this.annuncioRepository.findById(annuncioId).orElseThrow(()->new NotFoundException(annuncioId));
    }
    public Page<Annuncio> findAllAnnunci(int pageNum, int pageSize){
        Pageable pageable = PageRequest.of(pageNum, pageSize);
        return this.annuncioRepository.findAll(pageable);
    }
    public Annuncio saveAnnuncio(AnnuncioDTO payload, UUID utenteId) {
        Utente venditore = utenteService.findUtenteById(utenteId);
        Auto auto = new Auto(payload.auto().marca(), payload.auto().modello(), payload.auto().anno(), payload.auto().potenza(), payload.auto().cambio(), payload.auto().carburante(), payload.auto().chilometri());

        Annuncio annuncio = new Annuncio(payload.titolo(), payload.descrizione(), payload.prezzo(), LocalDate.now(), auto, venditore);
        if (payload.imgAuto() != null) {
            for (String url : payload.imgAuto()) {
                Immagine immagine = new Immagine(url);
                annuncio.getFotoAuto().add(immagine);
            }
        }
        return annuncioRepository.save(annuncio);
    }
}
