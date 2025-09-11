package cosimo.crupi.back_end.entities;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
public class Annuncio {
    @Id
    @Setter(AccessLevel.NONE)
    private UUID id;
    private String titolo;
    private String Descrizione;
    private int prezzo;
    private LocalDate dataPubblicazione;
    //immagine
    @OneToMany
    @JoinColumn(name = "immagine_id")
    private List<Immagine> fotoAuto = new ArrayList<>();

    //auto
    @OneToOne
    @JoinColumn(name = "auto_id")
    private Auto auto;

    //venditore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "utente_id", nullable = false)
    private Utente utente;

    @Override
    public String toString() {
        return "Annuncio{" +
                "id=" + id +
                ", titolo='" + titolo + '\'' +
                ", Descrizione='" + Descrizione + '\'' +
                ", prezzo=" + prezzo +
                ", dataPubblicazione=" + dataPubblicazione +
                '}';
    }
}
