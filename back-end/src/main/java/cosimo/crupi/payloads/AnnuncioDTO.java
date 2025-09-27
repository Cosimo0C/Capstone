package cosimo.crupi.payloads;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public record AnnuncioDTO(
        UUID id,
        @NotEmpty(message = "Il titolo è obbligatorio per l'annuncio")
        String titolo,
        @NotEmpty(message = "La descrizione è fondamentale per descrivere il mezzo e avere più possibilità di venderlo!")
        String descrizione,
        @Positive(message = "Il prezzo è obbligatorio")
        int prezzo,
        @NotNull(message = "Inserire l'auto è la cosa più importante!")
        AutoDTO auto,
        List<String> imgAuto,
        LocalDate dataPublicazione,
        String numeroProprietario
) {
}
