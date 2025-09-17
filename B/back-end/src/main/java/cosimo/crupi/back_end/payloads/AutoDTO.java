package cosimo.crupi.back_end.payloads;

import jakarta.validation.constraints.NotEmpty;

public record AutoDTO(
        @NotEmpty(message = "La marca è obbligatoria per maggior informazioni per il possibile acquirente")
        String marca,
        @NotEmpty(message = "Il modello è obbligatorio per maggior informazioni per il possibile acquirente")
        String modello,
        @NotEmpty(message = "L'anno è obbligatorio per maggior informazioni per il possibile acquirente")
        String anno,
        @NotEmpty(message = "La potenza è obbligatoria per maggior informazioni per il possibile acquirente")
        int potenza,
        @NotEmpty(message = "Il tipo di cambio è obbligatorio per maggior informazioni per il possibile acquirente")
        String cambio,
        @NotEmpty(message = "Il tipo di carburante è obbligatorio per maggior informazioni per il possibile acquirente")
        String carburante,
        @NotEmpty(message = "I chilometri sono fondamentali per capire l'usura dell'auto!")
        int chilometri
) {
}
