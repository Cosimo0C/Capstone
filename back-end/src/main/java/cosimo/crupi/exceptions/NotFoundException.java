package cosimo.crupi.exceptions;

import java.util.UUID;

public class NotFoundException extends RuntimeException {
    public NotFoundException(String message) {
        super(message);
    }
    public NotFoundException(UUID id){super("La risorsa con questo id: "+ id + " non è stato trovata!");}
}
