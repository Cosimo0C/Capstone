package cosimo.crupi.back_end.controllers;

import cosimo.crupi.back_end.entities.Utente;
import cosimo.crupi.back_end.services.UtenteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@RestController
@RequestMapping("/utente")
public class UtenteController {
    @Autowired
    private UtenteService utenteService;


    @DeleteMapping("/{utenteId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasAuthority('ADMIN')")
    public void  getByIdAndUpdate(@PathVariable UUID utenteId){
        this.utenteService.findByIdAndDelete(utenteId);
    }

    @PatchMapping("/{utenteId}/avatar")
    public String uploadImg(@RequestParam("avatar")MultipartFile file){
        System.out.println(file.getOriginalFilename());
        return this.utenteService.uploadAvatar(file);
    }
}
