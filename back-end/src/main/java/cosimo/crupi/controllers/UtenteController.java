package cosimo.crupi.controllers;

import cosimo.crupi.entities.Utente;
import cosimo.crupi.exceptions.ValidationException;
import cosimo.crupi.payloads.UtenteDTO;
import cosimo.crupi.payloads.UtenteRespDTO;
import cosimo.crupi.services.UtenteService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RestController
@RequestMapping("/me")
public class UtenteController {

    private final UtenteService utenteService;

    //me
    @GetMapping
    public Utente trovaIlMioProfilo(@AuthenticationPrincipal Utente currentAuth){
        return new Utente(currentAuth.getNome(), currentAuth.getCognome(), currentAuth.getEmail(), currentAuth.getPassword(), currentAuth.getNumCellulare(), currentAuth.getDataNascita(), currentAuth.getTipo());
    }

    @PostMapping
    public UtenteRespDTO modificaMioProfilo(@AuthenticationPrincipal Utente currentAuth,
                                            @RequestBody @Validated UtenteDTO payload,
                                            BindingResult bindingResult){
        if (bindingResult.hasErrors()){
            throw new ValidationException(bindingResult.getFieldErrors()
                    .stream().map(fieldError -> fieldError.getDefaultMessage()).toList());
        }else {
            Utente u = this.utenteService.findUtenteByIdAndUpdate(currentAuth.getId(), payload);
            return new UtenteRespDTO(u.getId());
        }
    }

    @DeleteMapping
    public void eliminaMioProfilo(@AuthenticationPrincipal Utente currentAuth){
        this.utenteService.findByIdAndDelete(currentAuth.getId());
    }

    @PatchMapping("/avatar")
    public String uploadImg(@RequestParam("avatar")MultipartFile file){
        System.out.println(file.getOriginalFilename());
        return this.utenteService.uploadAvatar(file);
    }
}
