package cosimo.crupi.back_end.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
public class Auto {
    @Id
    @Setter(AccessLevel.NONE)
    private UUID id;
    private String marca;
    private String modello;
    private LocalDate anno;
    private int potenza;
    private String cambio;
    private String carburante;

    @Override
    public String toString() {
        return "Auto{" +
                "id=" + id +
                ", marca='" + marca + '\'' +
                ", modello='" + modello + '\'' +
                ", anno=" + anno +
                ", potenza=" + potenza +
                ", cambio='" + cambio + '\'' +
                ", carburante='" + carburante + '\'' +
                '}';
    }
}
