package romanticweapon.server.controller.enforce;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import romanticweapon.server.domain.dto.request.weapon.RefineRequestDto;
import romanticweapon.server.domain.dto.response.RefineResponseDto;
import romanticweapon.server.domain.dto.response.WeaponInfoResponseDto;
import romanticweapon.server.domain.entity.User;
import romanticweapon.server.domain.entity.weapon.Weapon;
import romanticweapon.server.service.auth.UserService;
import romanticweapon.server.service.enforce.EnforceService;
import romanticweapon.server.util.SecurityUtil;

import java.sql.Ref;

@RestController
@RequiredArgsConstructor
public class EnforceController {

    private final EnforceService enforceService;
    private final UserService userService;

    @PostMapping("/refine")
    public ResponseEntity<?> enforce(@RequestBody RefineRequestDto refineRequestDto) throws Exception {
        // 누가 요청했는지 알아야함
        User userByAuthentication = userService.findUserByAuthentication();

        Weapon beforeWeapon = enforceService.getWeaponByUser(userByAuthentication);

        Weapon enforce = enforceService.enforce(userByAuthentication);

        String isSuccess = "FAILURE";
        if(beforeWeapon.getUpgrade() > enforce.getUpgrade()) isSuccess = "FAILURE";
        else isSuccess = "SUCCESS";

        RefineResponseDto refineResponseDto = new RefineResponseDto(
                enforce.getType(),
                enforce.getUpgrade(),
                enforce.getEnforceCost(),
                (int) Math.round((1 - enforce.getUpgrade() * 0.05) * 100),
                enforce.getPrice(),
                enforce.getName(),
                enforce.getWeaponImage().getFilePath(),
                isSuccess,
                userByAuthentication.getGold()
        );
        return new ResponseEntity<>(refineResponseDto, HttpStatus.OK);
    }

    @GetMapping("/weapon")
    public ResponseEntity<?> getWeaponInfo() throws Exception {
        // 누가 요청했는지 알아야함
        User userByAuthentication = userService.findUserByAuthentication();

        Weapon beforeWeapon = enforceService.getWeaponByUser(userByAuthentication);

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
        return new ResponseEntity<>(refineResponseDto, HttpStatus.OK);
    }

}
