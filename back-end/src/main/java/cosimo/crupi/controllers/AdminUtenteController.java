package cosimo.crupi.controllers;

import cosimo.crupi.entities.Utente;
import cosimo.crupi.exceptions.ValidationException;
import cosimo.crupi.payloads.UtenteDTO;
import cosimo.crupi.payloads.UtenteRespDTO;
import cosimo.crupi.services.UtenteService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("admin")
public class AdminUtenteController {

    private final UtenteService utenteService;

    //Admin
    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    public UtenteRespDTO createUtente(@RequestBody @Validated UtenteDTO payload,
                                      BindingResult validationResult) {
        if (validationResult.hasErrors()) {
            throw new ValidationException(validationResult.getFieldErrors()
                    .stream().map(fieldError -> fieldError.getDefaultMessage()).toList());
        } else {
            Utente newU = this.utenteService.saveUtente(payload);
            return new UtenteRespDTO(newU.getId());

        }
    }

    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public Page<UtenteRespDTO> getPageUtente(@RequestParam(defaultValue = "0") int pageNumber,
                                             @RequestParam(defaultValue = "10")int pageSize){
        return this.utenteService.findAll(pageNumber, pageSize).map(utente ->
                new UtenteRespDTO(utente.getId()));
    }

    @GetMapping("/{utenteId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public UtenteRespDTO getUtenteById(@PathVariable UUID utenteId){
        Utente u =this.utenteService.findUtenteById(utenteId);
        return new UtenteRespDTO(u.getId());
    }

    @PutMapping("/{utenteId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public UtenteRespDTO getUtenteByIdAndUpdate(@PathVariable UUID utenteId,
                                                @RequestBody @Validated UtenteDTO payload,
                                                BindingResult bindingResult){
        if (bindingResult.hasErrors()){
            throw new ValidationException(bindingResult.getFieldErrors()
                    .stream().map(fieldError -> fieldError.getDefaultMessage()).toList());
        }else {
            Utente u =this.utenteService.findUtenteByIdAndUpdate(utenteId, payload);
            return new UtenteRespDTO(u.getId());
        }
    }

    @PatchMapping("/{utenteId}/make")
    @PreAuthorize("hasAuthority('ADMIN')")
    public void getUtenteByIdAndPatchAdmin(@PathVariable UUID utenteId){
        this.utenteService.findUtenteByIdAndPatchAdmin(utenteId);
    }

    @PatchMapping("/{utenteId}/remove")
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

}
