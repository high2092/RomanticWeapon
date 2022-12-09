package romanticweapon.server.domain.enumm.error;

public enum ErrorCode {
    NOT_ENOUGH_GOLD(409),
    DUPLICATE_USER_ID(409),
    DUPLICATE_USER_NAME(409)
    ;

    private final int value;
    ErrorCode(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}
