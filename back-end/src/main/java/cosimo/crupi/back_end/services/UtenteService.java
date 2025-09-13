package cosimo.crupi.back_end.services;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import cosimo.crupi.back_end.entities.Utente;
import cosimo.crupi.back_end.exceptions.BadRequestException;
import cosimo.crupi.back_end.exceptions.NotFoundException;
import cosimo.crupi.back_end.payloads.UtenteDTO;
import cosimo.crupi.back_end.repositories.UtenteRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

@Service
@Slf4j
public class UtenteService {
    @Autowired
    private UtenteRepository utenteRepository;

    @Autowired
    Cloudinary imageUp;

    public Utente findUtenteById(UUID utenteId){
        return this.utenteRepository.findById(utenteId).orElseThrow(()-> new NotFoundException(utenteId));
    }
    public Utente saveUtente(UtenteDTO payload){
        this.utenteRepository.findByEmail(payload.email()).ifPresent(utente -> {
            throw new BadRequestException("L'email " + utente.getEmail() + " è già in uso!");
        });
        Utente newU = new Utente(payload.nome(), payload.cognome(), payload.email(), payload.password(), payload.numCellulare(), payload.dataNascita(), payload.tipo());
        newU.setAvatarUrl("https://ui-avatars.com/api/?name=" + payload.nome() + "+" + payload.cognome());
        Utente saveU = this.utenteRepository.save(newU);
        log.info("L'utente è stato inserito correttamente!");
        return saveU;
    }
    public Utente findUTenteByIdAndUpdate(UUID utenteId, UtenteDTO payload){
        boolean exists = utenteRepository.existsById(utenteId);
        if (exists){
            Utente fnd = findUtenteById(utenteId);
            if (!fnd.getEmail().equals(payload.email())){
                this.utenteRepository.findByEmail(payload.email()).ifPresent(utente -> {
                    throw new BadRequestException("L'email " + utente.getEmail() + " è già in uso!");
                });
            }
            fnd.setNome(payload.nome());
            fnd.setCognome(payload.cognome());
            fnd.setEmail(payload.email());
            fnd.setPassword(payload.password());
            fnd.setNumCellulare(payload.numCellulare());
            fnd.setDataNascita(payload.dataNascita());
            fnd.setTipo(payload.tipo());
            fnd.setAvatarUrl("https://ui-avatars.com/api/?name=" + payload.nome() + "+" + payload.cognome());
            Utente modU = this.utenteRepository.save(fnd);
            log.info("L'Utente " + fnd.getNome() + " è stato modificato correttamente");
            return modU;
        }else {
            throw new NotFoundException("L'utente con id: "+ utenteId + " non è stato trovato!");
        }
    }
    public void findByIdAndDelete(UUID utenteId){
        Utente fnd = findUtenteById(utenteId);
        this.utenteRepository.delete(fnd);
    }
    public String uploadAvatar(MultipartFile file) {
        try {
            Map result = imageUp.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
            String imgUrl = (String) result.get("secure_url");
            return imgUrl;

        } catch (IOException ex) {
            throw new BadRequestException("Errore nel salvataggio!");
        }
    }

}