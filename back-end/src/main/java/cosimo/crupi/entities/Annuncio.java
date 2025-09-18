package cosimo.crupi.entities;

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
    @GeneratedValue(generator = "UUID")
    @org.hibernate.annotations.GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id", updatable = false, nullable = false)
    @Setter(AccessLevel.NONE)
    private UUID id;
    private String titolo;
    private String descrizione;
    private int prezzo;
    private LocalDate dataPubblicazione;

    //immagini
    @ElementCollection
    @CollectionTable(
            name = "annuncio_img_auto",
            joinColumns = @JoinColumn(name = "annuncioId")
    )
    @Column(name = "url")
    private List<String> imgAuto = new ArrayList<>();

    public Annuncio(String titolo, String descrizione, int prezzo, LocalDate dataPubblicazione, Auto auto, Utente utente) {
        this.titolo = titolo;
        this.descrizione = descrizione;
        this.prezzo = prezzo;
        this.dataPubblicazione=dataPubblicazione;
        this.auto = auto;
        this.utente = utente;
    }

    //auto
    @OneToOne(cascade = CascadeType.ALL)
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
                ", descrizione='" + descrizione + '\'' +
                ", prezzo=" + prezzo +
                ", dataPubblicazione=" + dataPubblicazione +
                '}';
    }
}
