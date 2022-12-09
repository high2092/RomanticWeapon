package romanticweapon.server.exception.exception;

public class DuplicateUserNameException extends RuntimeException{

    public DuplicateUserNameException() {
    }

    public DuplicateUserNameException(String message) {
        super(message);
    }

    public DuplicateUserNameException(String message, Throwable cause) {
        super(message, cause);
    }

    public DuplicateUserNameException(Throwable cause) {
        super(cause);
    }

    public DuplicateUserNameException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
