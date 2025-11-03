package cosimo.crupi.services;

import cosimo.crupi.entities.Annuncio;
import cosimo.crupi.entities.Auto;
import cosimo.crupi.entities.Utente;
import cosimo.crupi.exceptions.NotFoundException;
import cosimo.crupi.payloads.AnnuncioDTO;
import cosimo.crupi.repositories.AnnuncioRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.UUID;

@Service
@Slf4j
public class AnnuncioService {
    @Autowired
    private AnnuncioRepository annuncioRepository;

    @Autowired
    private UtenteService utenteService;

    public Annuncio findAnnuncioById(UUID annuncioId){
        return this.annuncioRepository.findById(annuncioId).orElseThrow(()->new NotFoundException("Annuncio non trovato!"));
    }
    public Page<Annuncio> findAllAnnunci(int pageNum, int pageSize){
        Pageable pageable = PageRequest.of(pageNum, pageSize);
        return this.annuncioRepository.findAll(pageable);
    }
    public Page<Annuncio> searchAnnunci(String search, int pageNum, int pageSize) {
        Pageable pageable = PageRequest.of(pageNum, pageSize);
        return annuncioRepository.searchAnnunci(search, pageable);
    }
    public Annuncio saveAnnuncio(AnnuncioDTO payload, UUID utenteId) {
        Utente venditore = utenteService.findUtenteById(utenteId);
        Auto auto = new Auto(payload.auto().marca(), payload.auto().modello(), payload.auto().anno(), payload.auto().potenza(), payload.auto().cambio(), payload.auto().carburante(), payload.auto().chilometri());

        Annuncio annuncio = new Annuncio(payload.titolo(), payload.descrizione(), payload.prezzo(), LocalDate.now(), auto, venditore);
        annuncio.setImgAuto(new ArrayList<>());
        if (payload.imgAuto() != null){
            annuncio.getImgAuto().addAll(payload.imgAuto());
        }

        log.info("L'annuncio è stato salvato correttamente!");
        return this.annuncioRepository.save(annuncio);
    }
    public Annuncio findAnnuncioByIdAndUpdate(UUID annuncioId, AnnuncioDTO payload){
        Annuncio fnd = findAnnuncioById(annuncioId);

        fnd.setTitolo(payload.titolo());
        fnd.setDescrizione(payload.descrizione());
        fnd.setPrezzo(payload.prezzo());


        Auto fndAuto = fnd.getAuto();
        if(fndAuto == null){
            fndAuto = new Auto();
            fnd.setAuto(fndAuto);
        }
        fndAuto.setMarca(payload.auto().marca());
        fndAuto.setModello(payload.auto().modello());
        fndAuto.setAnno(payload.auto().anno());
        fndAuto.setPotenza(payload.auto().potenza());
        fndAuto.setCambio(payload.auto().cambio());
        fndAuto.setCarburante(payload.auto().carburante());
        fndAuto.setChilometri(payload.auto().chilometri());

        if (payload.imgAuto() != null){
            fnd.getImgAuto().clear();
            fnd.getImgAuto().addAll(payload.imgAuto());
        }

        log.info("L'annuncio è stato aggiornato correttamente!");
        return this.annuncioRepository.save(fnd);
    }
    public void findAnnuncioByIdAndDelete(UUID annuncioId){
        Annuncio fnd = findAnnuncioById(annuncioId);
        this.annuncioRepository.delete(fnd);
    }
    public Page<Annuncio> findAnnunciByUtente(UUID utenteId, int pageNumber, int pageSize){
        return this.annuncioRepository.findByUtenteId(utenteId, PageRequest.of(pageNumber, pageSize));
    }
}
