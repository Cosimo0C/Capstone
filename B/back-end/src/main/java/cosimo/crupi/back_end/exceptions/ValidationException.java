package cosimo.crupi.back_end.exceptions;

import java.util.List;

public class ValidationException extends RuntimeException {
    private List<String> errorMess;
    public ValidationException(List<String> errorMess) {
        super("Errori di validazione!");
        this.errorMess=errorMess;
    }
}
