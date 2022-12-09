package romanticweapon.server.exception.exception;

public class NotEnoughGoldException extends RuntimeException{
    public NotEnoughGoldException() {
    }

    public NotEnoughGoldException(String message) {
        super(message);
    }

    public NotEnoughGoldException(String message, Throwable cause) {
        super(message, cause);
    }

    public NotEnoughGoldException(Throwable cause) {
        super(cause);
    }

    public NotEnoughGoldException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
