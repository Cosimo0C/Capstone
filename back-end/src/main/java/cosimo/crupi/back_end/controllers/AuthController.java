package cosimo.crupi.back_end.controllers;

import cosimo.crupi.back_end.entities.Utente;
import cosimo.crupi.back_end.exceptions.ValidationException;
import cosimo.crupi.back_end.payloads.LoginDTO;
import cosimo.crupi.back_end.payloads.LoginRespDTO;
import cosimo.crupi.back_end.payloads.UtenteDTO;
import cosimo.crupi.back_end.services.AuthenticationService;
import cosimo.crupi.back_end.services.UtenteService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UtenteService utenteService;
    @Autowired
    private AuthenticationService authenticationService;

    //registrazione
    @PostMapping("/registrazione")
    public Utente registrazione(@RequestBody @Valid UtenteDTO payload){
        return utenteService.saveUtente(payload);
    }

    //login
    @PostMapping("/login")
    public LoginRespDTO loginRespDTO(@RequestBody LoginDTO body){
        String accToken = authenticationService.checkAccessAndGenerateToken(body);
        return new LoginRespDTO(accToken);
    }

    //admin
    @PostMapping("/registerAdmin")
    @ResponseStatus(HttpStatus.CREATED)
    public Utente createUtente(@RequestBody @Validated UtenteDTO body, BindingResult validationResult){
        if (validationResult.hasErrors()){
            throw new ValidationException(validationResult.getFieldErrors()
                    .stream().map(fieldError -> fieldError.getDefaultMessage()).toList());
        }else {
            return this.utenteService.saveUtente(body);
        }
    }
}
