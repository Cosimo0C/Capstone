package cosimo.crupi.payloads.errors;

import java.time.LocalDateTime;

public record ErrorsDTO(
        String msg,
        LocalDateTime time
) {
}
