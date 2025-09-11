package cosimo.crupi.back_end.payloads.errors;

import java.time.LocalDateTime;

public record ErrorsDTO(
        String msg,
        LocalDateTime time
) {
}
