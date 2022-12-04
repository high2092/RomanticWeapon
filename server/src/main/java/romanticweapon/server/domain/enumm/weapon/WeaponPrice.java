package romanticweapon.server.domain.enumm.weapon;

import romanticweapon.server.domain.entity.WeaponImage;

public enum WeaponPrice {
    SWORD_1(100), SWORD_2(200);

    private final int value;
    WeaponPrice(int value) {
        this.value= value;
    }
    public int getValue() {
        return value;
    }
}
