package cosimo.crupi.back_end.payloads;

import cosimo.crupi.back_end.entities.Utente;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record AnnuncioDTO(
        @NotEmpty(message = "Il titolo è obbligatorio per l'annuncio")
        String titolo,
        @NotEmpty(message = "La descrizione è fondamentale per descrivere il mezzo e avere più possibilità di venderlo!")
        String descrizione,
        @NotEmpty(message = "Il prezzo è obbligatorio")
        int prezzo,
        @NotNull(message = "Inserire l'auto è la cosa più importante!")
        AutoDTO auto,
        List<String> imgAuto
) {
}
