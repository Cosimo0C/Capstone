package cosimo.crupi.payloads.errors;

import java.time.LocalDateTime;
import java.util.List;

public record ErrorsListDTO(String msg, LocalDateTime time, List<String> errorsList) {
}
