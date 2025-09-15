package cosimo.crupi.back_end.payloads;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.util.List;

public record AnnuncioDTO(
        @NotEmpty(message = "Il titolo è obbligatorio per l'annuncio")
        String titolo,
        @NotEmpty(message = "La descrizione è fondamentale per descrivere il mezzo e avere più possibilità di venderlo!")
        String descrizione,
        @Positive(message = "Il prezzo è obbligatorio")
        int prezzo,
        @NotNull(message = "Inserire l'auto è la cosa più importante!")
        AutoDTO auto,
        List<String> imgAuto
) {
}
