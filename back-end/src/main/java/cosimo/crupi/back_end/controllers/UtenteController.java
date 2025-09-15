package cosimo.crupi.back_end.controllers;

import cosimo.crupi.back_end.entities.Utente;
import cosimo.crupi.back_end.exceptions.ValidationException;
import cosimo.crupi.back_end.payloads.UtenteDTO;
import cosimo.crupi.back_end.services.UtenteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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
    public Page<Utente> getPageUtente(@RequestParam(defaultValue = "0") int pageNuber, @RequestParam(defaultValue = "10")int pageSize){
        return this.utenteService.findAll(pageNuber, pageSize);
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
}
