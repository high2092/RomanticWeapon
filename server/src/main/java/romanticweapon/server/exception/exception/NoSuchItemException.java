package romanticweapon.server.exception.exception;

public class NoSuchItemException extends RuntimeException{
    public NoSuchItemException() {
    }

    public NoSuchItemException(String message) {
        super(message);
    }

    public NoSuchItemException(String message, Throwable cause) {
        super(message, cause);
    }

    public NoSuchItemException(Throwable cause) {
        super(cause);
    }

    public NoSuchItemException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
