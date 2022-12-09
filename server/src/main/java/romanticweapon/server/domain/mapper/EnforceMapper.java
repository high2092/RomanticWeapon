package romanticweapon.server.domain.mapper;

import org.springframework.stereotype.Component;
import romanticweapon.server.domain.dto.response.weapon.RefineResponseDto;
import romanticweapon.server.domain.dto.response.weapon.WeaponInfoResponseDto;
import romanticweapon.server.domain.entity.User;
import romanticweapon.server.domain.entity.weapon.Weapon;

@Component
public class EnforceMapper {
    public RefineResponseDto getRefineResponseDto(User userByAuthentication, Long beforeUp, Weapon enforce, String isSuccess, Boolean achieve) {
        RefineResponseDto refineResponseDto = new RefineResponseDto(
                enforce.getType(),
                enforce.getUpgrade(),
                enforce.getEnforceCost(),
                (int) Math.round((1 - enforce.getUpgrade() * 0.05) * 100),
                enforce.getPrice(),
                enforce.getName(),
                enforce.getWeaponImage().getFilePath(),
                isSuccess,
                userByAuthentication.getGold(),
                (int) Math.round((1 - beforeUp * 0.05) * 100),
                achieve
        );
        return refineResponseDto;
    }

    public WeaponInfoResponseDto getWeaponInfoResponseDto(User userByAuthentication, Weapon beforeWeapon) {
        WeaponInfoResponseDto refineResponseDto = new WeaponInfoResponseDto(
                beforeWeapon.getType(),
                beforeWeapon.getUpgrade(),
                beforeWeapon.getEnforceCost(),
                (int) Math.round((1 - beforeWeapon.getUpgrade() * 0.05) * 100),
                beforeWeapon.getPrice(),
                beforeWeapon.getName(),
                beforeWeapon.getWeaponImage().getFilePath(),
                userByAuthentication.getGold()
        );
        return refineResponseDto;
    }
}
