package cosimo.crupi.back_end.entities;

import cosimo.crupi.back_end.enums.Tipo;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.*;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor

public class Utente implements UserDetails {
    @Id
    @Setter(AccessLevel.NONE)
    private UUID id;
    String nome;
    String cognome;
    String email;
    String password;
    String numCellulare;
    LocalDate dataNascita;
    String avatarUrl;

    //stringhifizzo l'enun
    @Enumerated(EnumType.STRING)
    Tipo tipo;

    public Utente(String nome, String cognome, String email, String password, String numCellulare, LocalDate dataNascita, Tipo tipo){
        this.nome=nome;
        this.cognome=cognome;
        this.email=email;
        this.password=password;
        this.numCellulare=numCellulare;
        this.dataNascita=dataNascita;
        this.tipo=tipo;
    }

    //annunci nei preferiti
    @ManyToMany
    @JoinTable(
            name = "preferiti",
            joinColumns = @JoinColumn(name = "utente_id"),
            inverseJoinColumns = @JoinColumn(name = "annuncio_id")
    )
    private Set<Annuncio> preferiti = new HashSet<>();

    @Override
    public String toString() {
        return "Utente{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", cognome='" + cognome + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", numCellulare='" + numCellulare + '\'' +
                ", dataNascita=" + dataNascita +
                ", tipo=" + tipo +
                '}';
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities(){
        return List.of(new SimpleGrantedAuthority(this.tipo.name()));
    }

    @Override
    public String getUsername() {
        return this.email;
    }
}

