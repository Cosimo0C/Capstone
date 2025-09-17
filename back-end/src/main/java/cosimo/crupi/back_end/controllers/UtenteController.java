package cosimo.crupi.back_end.controllers;

import cosimo.crupi.back_end.entities.Annuncio;
import cosimo.crupi.back_end.entities.Utente;
import cosimo.crupi.back_end.exceptions.UnAuthorizedException;
import cosimo.crupi.back_end.exceptions.ValidationException;
import cosimo.crupi.back_end.payloads.*;
import cosimo.crupi.back_end.services.AnnuncioService;
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

    @Autowired
    private AnnuncioService annuncioService;

    //Admin
    @PostMapping("/creareUtente")
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

    @GetMapping("/listaUtenti")
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
        return new Utente(currentAuth.getNome(), currentAuth.getCognome(), currentAuth.getEmail(), currentAuth.getPassword(), currentAuth.getNumCellulare(), currentAuth.getDataNascita(), currentAuth.getTipo());
    }

    @PostMapping("/me")
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
    public  Page<AnnuncioDTO> getAnnunci(@RequestParam(defaultValue = "0")int pageNumber,
                                             @RequestParam(defaultValue = "20")int pageSize){
        return this.annuncioService.findAllAnnunci(pageNumber, pageSize).map(this::mapADTO);
    }

    @GetMapping("/me/annunci")
    public Page<AnnuncioDTO> getAnnunciMiei(@AuthenticationPrincipal Utente currentAuth,
                                         @RequestParam(defaultValue = "0") int pageNumber,
                                         @RequestParam(defaultValue = "20") int pageSize){
        return this.annuncioService.findAnnunciByUtente(currentAuth.getId(), pageNumber, pageSize).map(this::mapADTO);
    }

    @PostMapping("/me/creoAnnuncio")
    @ResponseStatus(HttpStatus.CREATED)
    public AnnuncioDTO createAnnucnio(@RequestBody  @Validated AnnuncioDTO payload,
                                      @AuthenticationPrincipal Utente currentAuth){
        Annuncio a = this.annuncioService.saveAnnuncio(payload, currentAuth.getId());
        return mapADTO(a);
    }

    @PutMapping("/me/modAnnuncio/{annuncioId}")
    @ResponseStatus(HttpStatus.OK)
    public AnnuncioDTO updateAnnuncio(@PathVariable UUID annuncioId,
                                   @RequestBody @Validated AnnuncioDTO payload,
                                   BindingResult bindingResult,
                                   @AuthenticationPrincipal Utente currentAuth){
        Annuncio fnd = this.annuncioService.findAnnuncioById(annuncioId);
        if (!fnd.getUtente().getId().equals(currentAuth.getId())){
            throw new UnAuthorizedException("Non puoi modificare questo annuncio che non è tuo!");
        }
        if (bindingResult.hasErrors()){
            throw new ValidationException(bindingResult.getFieldErrors()
                    .stream().map(fieldError -> fieldError.getDefaultMessage()).toList());
        }else {
            Annuncio modA = this.annuncioService.findAnnuncioByIdAndUpdate(annuncioId, payload);
            return mapADTO(modA);
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

    // MAPPER da Annuncio Entity to DTO
    private AnnuncioDTO mapADTO(Annuncio annuncio){
        return new AnnuncioDTO(
                annuncio.getTitolo(),
                annuncio.getDescrizione(),
                annuncio.getPrezzo(),
                new AutoDTO(
                        annuncio.getAuto().getMarca(),
                        annuncio.getAuto().getModello(),
                        annuncio.getAuto().getAnno(),
                        annuncio.getAuto().getPotenza(),
                        annuncio.getAuto().getCambio(),
                        annuncio.getAuto().getCarburante(),
                        annuncio.getAuto().getChilometri()
                ),
                annuncio.getFotoAuto().stream().map(immagine -> immagine.getUrl()).toList()
        );
    }
}
