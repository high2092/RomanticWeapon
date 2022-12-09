package romanticweapon.server.controller.shop;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import romanticweapon.server.domain.entity.user.User;
import romanticweapon.server.service.auth.UserService;
import romanticweapon.server.service.inventory.InventoryService;

@RestController
@RequiredArgsConstructor
@Slf4j
public class InventoryController {

    private final UserService userService;
    private final InventoryService inventoryService;

    @GetMapping("/inventory")
    public ResponseEntity<?> getUserInventoryInfo() {
        User userByAuthentication = userService.findUserByAuthentication();
        return new ResponseEntity<>(
                inventoryService.getInventoryInfo(userByAuthentication),
                HttpStatus.OK
        );
    }
}
