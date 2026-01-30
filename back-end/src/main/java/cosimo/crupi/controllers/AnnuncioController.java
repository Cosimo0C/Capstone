package cosimo.crupi.controllers;

import cosimo.crupi.entities.Annuncio;
import cosimo.crupi.entities.Utente;
import cosimo.crupi.mappers.AnnuncioMapper;
import cosimo.crupi.payloads.AnnuncioDTO;
import cosimo.crupi.services.AnnuncioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/annunci")
public class AnnuncioController {

    private final AnnuncioService annuncioService;
    private final AnnuncioMapper annuncioMapper;

    //annunci
    @GetMapping
    public Page<AnnuncioDTO> getAnnunci(@RequestParam(defaultValue = "0")int pageNumber,
                                        @RequestParam(defaultValue = "20")int pageSize,
                                        @RequestParam(required = false) String search){
        Page<Annuncio> page;
        if (search != null && !search.isBlank()) {
            page = annuncioService.searchAnnunci(search, pageNumber, pageSize);
        } else {
            page = annuncioService.findAllAnnunci(pageNumber, pageSize);
        }

        return page.map(annuncioMapper::mapDTO);
    }

    @GetMapping("/my")
    public Page<AnnuncioDTO> getAnnunciMiei(@AuthenticationPrincipal Utente currentAuth,
                                            @RequestParam(defaultValue = "0") int pageNumber,
                                            @RequestParam(defaultValue = "20") int pageSize){
        return this.annuncioService.findAnnunciByUtente(currentAuth.getId(), pageNumber, pageSize).map(annuncioMapper::mapDTO);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AnnuncioDTO createAnnucnio(@RequestBody  @Valid AnnuncioDTO payload,
                                      @AuthenticationPrincipal Utente currentAuth){
        Annuncio a = this.annuncioService.saveAnnuncio(payload, currentAuth.getId());
        return annuncioMapper.mapDTO(a);
    }

    @PutMapping("/{annuncioId}")
    @ResponseStatus(HttpStatus.OK)
    public AnnuncioDTO updateAnnuncio(@PathVariable UUID annuncioId,
                                      @RequestBody @Valid AnnuncioDTO payload,
                                      @AuthenticationPrincipal Utente currentAuth){
            Annuncio modA = this.annuncioService.findAnnuncioByIdAndUpdate(annuncioId, payload, currentAuth.getId());
            return annuncioMapper.mapDTO(modA);
    }

    @DeleteMapping("/{annuncioId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteMioAnnuncio (@PathVariable UUID annuncioId, @AuthenticationPrincipal Utente currentAuth){
            this.annuncioService.findAnnuncioByIdAndDelete(annuncioId, currentAuth.getId());
    }
}
