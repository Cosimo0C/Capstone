package cosimo.crupi.back_end.controllers;

import cosimo.crupi.back_end.entities.Annuncio;
import cosimo.crupi.back_end.entities.Utente;
import cosimo.crupi.back_end.exceptions.UnAuthorizedException;
import cosimo.crupi.back_end.exceptions.ValidationException;
import cosimo.crupi.back_end.payloads.AnnuncioDTO;
import cosimo.crupi.back_end.payloads.UtenteDTO;
import cosimo.crupi.back_end.services.AnnuncioService;
import cosimo.crupi.back_end.services.UtenteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@RestController
@RequestMapping("/utente")
public class UtenteController {

    @Autowired
    private UtenteService utenteService;

    @Autowired
    private AnnuncioService annuncioService;

    //Admin
    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    public Utente createUtente(@RequestBody @Validated UtenteDTO body, BindingResult validationResult) {
        if (validationResult.hasErrors()) {
            throw new ValidationException(validationResult.getFieldErrors()
                    .stream().map(fieldError -> fieldError.getDefaultMessage()).toList());
        } else {
            return this.utenteService.saveUtente(body);

        }
    }

    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public Page<Utente> getPageUtente(@RequestParam(defaultValue = "0") int pageNumber,
                                      @RequestParam(defaultValue = "10")int pageSize){
        return this.utenteService.findAll(pageNumber, pageSize);
    }

    @GetMapping("/{utenteId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public Utente getUtenteById(UUID utenteId){
        return this.utenteService.findUtenteById(utenteId);
    }

    @PutMapping("/{utenteId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public Utente getUtenteByIdAndUpdate(@PathVariable UUID utenteId, @RequestBody @Validated UtenteDTO payload, BindingResult bindingResult){
        if (bindingResult.hasErrors()){
            throw new ValidationException(bindingResult.getFieldErrors()
                    .stream().map(fieldError -> fieldError.getDefaultMessage()).toList());
        }else {
            return this.utenteService.findUtenteByIdAndUpdate(utenteId, payload);
        }
    }

    @PatchMapping("/{utenteId}/addAdmin")
    @PreAuthorize("hasAuthority('ADMIN')")
    public void getUtenteByIdAndPatchAdmin(@PathVariable UUID utenteId){
        this.utenteService.findUtenteByIdAndPatchAdmin(utenteId);
    }

    @PatchMapping("/{utenteId}/remAdmin")
    @PreAuthorize("hasAuthority('ADMIN')")
    public void getUtenteByIdAndRemoveAdmin(@PathVariable UUID utenteId){
        this.utenteService.findUtenteByIdAndRemoveAdmin(utenteId);
    }

    @DeleteMapping("/{utenteId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasAuthority('ADMIN')")
    public void  getByIdAndUpdate(@PathVariable UUID utenteId){
        this.utenteService.findByIdAndDelete(utenteId);
    }

    //me
    @GetMapping("/me")
    public Utente trovaIlMioProfilo(@AuthenticationPrincipal Utente currentAuth){
        return this.utenteService.findUtenteById(currentAuth.getId());
    }

    @PutMapping("/me")
    public Utente modificaMioProfilo(@AuthenticationPrincipal Utente currentAuth, UtenteDTO payload, BindingResult bindingResult){
        if (bindingResult.hasErrors()){
            throw new ValidationException(bindingResult.getFieldErrors()
                    .stream().map(fieldError -> fieldError.getDefaultMessage()).toList());
        }else {
            return this.utenteService.findUtenteByIdAndUpdate(currentAuth.getId(), payload);
        }
    }

    @DeleteMapping("/me")
    public void eliminaMioProfilo(@AuthenticationPrincipal Utente currentAuth){
        this.utenteService.findByIdAndDelete(currentAuth.getId());
    }

    @PatchMapping("/{utenteId}/avatar")
    public String uploadImg(@RequestParam("avatar")MultipartFile file){
        System.out.println(file.getOriginalFilename());
        return this.utenteService.uploadAvatar(file);
    }

    //annunci
    @GetMapping("/annunci")
    public  Page<Annuncio> getAnnunci(@RequestParam(defaultValue = "0")int pageNumber,
                                      @RequestParam(defaultValue = "20")int pageSize){
        return this.annuncioService.findAllAnnunci(pageNumber, pageSize);
    }

    @GetMapping("/me/annunci")
    public Page<Annuncio> getAnnunciMiei(@AuthenticationPrincipal Utente currentAuth,
                                         @RequestParam(defaultValue = "0") int pageNumber,
                                         @RequestParam(defaultValue = "20") int pageSize){
        return this.annuncioService.findAnnunciByUtente(currentAuth.getId(), pageNumber, pageSize);
    }

    @PostMapping("/me/creoAnnuncio")
    @ResponseStatus(HttpStatus.CREATED)
    public Annuncio createAnnucnio(@RequestBody  @Validated AnnuncioDTO payload, @RequestParam Utente utente){
        return this.annuncioService.saveAnnuncio(payload, utente.getId());
    }

    @PutMapping("/me/modAnnuncio/{annuncioId}")
    @ResponseStatus(HttpStatus.OK)
    public Annuncio updateAnnuncio(@PathVariable UUID annuncioId, @RequestBody @Validated AnnuncioDTO payload, BindingResult bindingResult, @AuthenticationPrincipal Utente currentAuth){
        Annuncio fnd = this.annuncioService.findAnnuncioById(annuncioId);
        if (!fnd.getUtente().getId().equals(currentAuth.getId())){
            throw new UnAuthorizedException("Non puoi modificare questo annuncio che non è tuo!");
        }
        if (bindingResult.hasErrors()){
            throw new ValidationException(bindingResult.getFieldErrors()
                    .stream().map(fieldError -> fieldError.getDefaultMessage()).toList());
        }else {
            return this.annuncioService.findAnnuncioByIdAndUpdate(annuncioId, payload);
        }
    }

    @DeleteMapping("me/eliminoAnnuncio/{annuncioId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteMioAnnuncio (@PathVariable UUID annuncioId, @AuthenticationPrincipal Utente currentAuth){
        Annuncio fnd = this.annuncioService.findAnnuncioById(annuncioId);
        if (!fnd.getUtente().getId().equals(currentAuth.getId())){
            throw new UnAuthorizedException("Non puoi eliminare questo annuncio! Non sei stato tu a publicarlo!");
        }else {
            this.annuncioService.findAnnuncioByIdAndDelete(annuncioId);
        }
    }
}
