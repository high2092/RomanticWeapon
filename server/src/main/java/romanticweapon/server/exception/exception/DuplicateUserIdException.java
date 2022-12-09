package romanticweapon.server.exception.exception;

public class DuplicateUserIdException extends RuntimeException {

    public DuplicateUserIdException() {
    }

    public DuplicateUserIdException(String message) {
        super(message);
    }

    public DuplicateUserIdException(String message, Throwable cause) {
        super(message, cause);
    }

    public DuplicateUserIdException(Throwable cause) {
        super(cause);
    }

    public DuplicateUserIdException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
