package romanticweapon.server.domain.enumm.item;

public enum ItemCode {
    PROTECT_SHIELD(1);
    private int value;
    ItemCode(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}
