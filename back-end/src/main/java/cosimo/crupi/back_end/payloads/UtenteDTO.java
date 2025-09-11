package cosimo.crupi.back_end.payloads;

import jakarta.validation.constraints.*;

import java.time.LocalDate;

public record UtenteDTO(
        @NotEmpty(message = "Il nome è obbligatio per poter essere contattato")
        String nome,
        @NotEmpty(message = "Il cognome è obbligatio per poter essere contattato")
        String cognome,
        @NotEmpty(message = "L'email è obbligatoria per poter effetture il login")
        @Email(message = "L'email inserita non è nel formato corretto!")
        String email,
        @Pattern(regexp = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{4,}$", message = "La password deve contenere: 1 carat maiuscolo, uno minuscolo..... e deve essere minimo di 6 caratteri!")
        @Size(min = 6)
        String password,
        @NotEmpty(message = "Il numero di cellulare è importante per poter essere contattati dal possibile acquirente")
        String numCellulare,
        @NotNull(message = "La data di nascita è obbligatoria")
        @Past(message = "La data deve essere nel passato")
        LocalDate dataNascita
) {
}
