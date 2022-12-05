package romanticweapon.server.domain.dto.response;

import lombok.Getter;
import lombok.Setter;
import romanticweapon.server.domain.enumm.weapon.WeaponType;

@Getter
@Setter
public class WeaponInfoResponseDto {
    WeaponType type;
    Long level;
    Long cost;
    int Chance;
    Long price;
    String name;
    String filePath;
    Long gold;

    public WeaponInfoResponseDto(WeaponType type, Long level, Long cost, int chance, Long price, String name, String filePath, Long gold) {
        this.type = type;
        this.level = level;
        this.cost = cost;
        Chance = chance;
        this.price = price;
        this.name = name;
        this.filePath = filePath;
        this.gold = gold;
    }
}
