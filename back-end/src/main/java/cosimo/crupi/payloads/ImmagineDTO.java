package cosimo.crupi.payloads;

import jakarta.validation.constraints.NotEmpty;

public record ImmagineDTO(
        @NotEmpty(message = "L'url è obbligatorio")
        String url
) {
}
