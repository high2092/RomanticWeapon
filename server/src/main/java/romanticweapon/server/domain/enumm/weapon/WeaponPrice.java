package romanticweapon.server.domain.enumm.weapon;

public enum WeaponPrice {
    SWORD1(100), SWORD2(200);

    private final int value;
    WeaponPrice(int value) {
        this.value= value;
    }
    public int getValue() {
        return value;
    }
}
