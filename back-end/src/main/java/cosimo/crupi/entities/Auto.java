package cosimo.crupi.entities;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
public class Auto {
    @Id
    @GeneratedValue(generator = "UUID")
    @org.hibernate.annotations.GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id", updatable = false, nullable = false)
    @Setter(AccessLevel.NONE)
    private UUID id;
    private String marca;
    private String modello;
    private String anno;
    private int potenza;
    private String cambio;
    private String carburante;
    private int chilometri;

    public Auto (String marca, String modello, String anno, int potenza, String cambio, String carburante, int chilometri) {
        this.marca = marca;
        this.modello = modello;
        this.anno = anno;
        this.potenza = potenza;
        this.cambio = cambio;
        this.carburante = carburante;
        this.chilometri = chilometri;
    }

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
                ", chilometri=" + chilometri +
                '}';
    }
}
