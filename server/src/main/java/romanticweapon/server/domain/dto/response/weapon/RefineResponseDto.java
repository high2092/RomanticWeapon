package romanticweapon.server.domain.dto.response.weapon;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import romanticweapon.server.domain.enumm.weapon.WeaponType;

@Getter
@Setter
public class RefineResponseDto {
    WeaponType type;
    Long level;
    Long cost;
    int Chance;
    Long price;
    String name;
    String filePath;

    String result;
    Long gold;

    int prevChance;

    Boolean achievement;

    @Builder
    public RefineResponseDto(WeaponType type, Long level, Long cost, int chance, Long price, String name, String filePath, String result, Long gold, int prevChance, Boolean achievement) {
        this.type = type;
        this.level = level;
        this.cost = cost;
        Chance = chance;
        this.price = price;
        this.name = name;
        this.filePath = filePath;
        this.result = result;
        this.gold = gold;
        this.prevChance = prevChance;
        this.achievement = achievement;
    }
}

