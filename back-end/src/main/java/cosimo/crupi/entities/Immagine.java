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
public class Immagine {
    @Id
    @GeneratedValue(generator = "UUID")
    @org.hibernate.annotations.GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id", updatable = false, nullable = false)
    @Setter(AccessLevel.NONE)
    private UUID id;
    private String url;

    public Immagine(String url) {
        this.url = url;
    }

    @Override
    public String toString() {
        return "Immagine{" +
                "id=" + id +
                ", url='" + url + '\'' +
                '}';
    }
}
