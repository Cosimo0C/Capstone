package cosimo.crupi.back_end.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Table
@Getter
@NoArgsConstructor
public class Preferiti {
    @Id
    private UUID id;
}
