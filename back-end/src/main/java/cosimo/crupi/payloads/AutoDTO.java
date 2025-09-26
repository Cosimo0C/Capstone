package cosimo.crupi.payloads;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Positive;

public record AutoDTO(
        @NotEmpty(message = "La marca è obbligatoria per maggior informazioni per il possibile acquirente")
        String marca,
        @NotEmpty(message = "Il modello è obbligatorio per maggior informazioni per il possibile acquirente")
        String modello,
        @NotEmpty(message = "L'anno è obbligatorio per maggior informazioni per il possibile acquirente")
        String anno,
        @Positive(message = "La potenza è obbligatoria per maggior informazioni per il possibile acquirente")
        int potenza,
        @NotEmpty(message = "Il tipo di cambio è obbligatorio per maggior informazioni per il possibile acquirente")
        String cambio,
        @NotEmpty(message = "Il tipo di carburante è obbligatorio per maggior informazioni per il possibile acquirente")
        String carburante,
        @Positive(message = "I chilometri sono fondamentali per capire l'usura dell'auto!")
        int chilometri
) {
}
