package romanticweapon.server.domain.dto.response;

import lombok.AllArgsConstructor;
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

    Boolean isSuccess;

    public RefineResponseDto(WeaponType type, Long upgrade, Long refineCost, int chance, Long price, String name, String filePath, Boolean isSuccess) {
        this.type = type;
        this.level = upgrade;
        this.cost = refineCost;
        Chance = chance;
        this.price = price;
        this.name = name;
        this.filePath = filePath;
        this.isSuccess = isSuccess;
    }
}

