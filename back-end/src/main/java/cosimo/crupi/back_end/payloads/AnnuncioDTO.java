package cosimo.crupi.back_end.payloads;

import jakarta.validation.constraints.NotEmpty;

public record AnnuncioDTO(
        @NotEmpty(message = "Il titolo è obbligatorio per l'annuncio")
        String titolo,
        @NotEmpty(message = "Il prezzo è obbligatorio")
        int prezzo
) {
}
