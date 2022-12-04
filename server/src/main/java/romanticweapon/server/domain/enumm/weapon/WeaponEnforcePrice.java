package romanticweapon.server.domain.enumm.weapon;

public enum WeaponEnforcePrice {
    SWORD1(10), SWORD2(20);

    private final int value;
    WeaponEnforcePrice(int value) {
        this.value= value;
    }
    public int getValue() {
        return value;
    }
}
