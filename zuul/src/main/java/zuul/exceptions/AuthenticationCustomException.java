package zuul.exceptions;

public class AuthenticationCustomException extends RuntimeException {

    public AuthenticationCustomException() {
        super();
    }

    public AuthenticationCustomException(String errorMessage) {
        super(errorMessage);
    }

    public AuthenticationCustomException(String errorMessage, Throwable err) {
        super(errorMessage, err);
    }
}
