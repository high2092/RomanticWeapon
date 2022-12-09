package romanticweapon.server.controller.shop;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import romanticweapon.server.domain.dto.request.shop.BuyItemRequestDto;
import romanticweapon.server.domain.entity.user.User;
import romanticweapon.server.service.auth.UserService;
import romanticweapon.server.service.shop.ShopService;
import romanticweapon.server.util.auth.SecurityUtil;

@RestController
@RequiredArgsConstructor
@Slf4j
public class ShopController {

    private final UserService userService;
    private final ShopService shopService;

    @PostMapping("/shop/buy")
    public ResponseEntity<?> buyItem(@RequestBody BuyItemRequestDto request) {
        User userByAuthentication = userService.findUserByAuthentication();

        return new ResponseEntity<>(shopService.buyItem(userByAuthentication, request.getIdx()), HttpStatus.OK);
    }

    @GetMapping("/shop")
    public ResponseEntity<?> getShopInfo() {
        return new ResponseEntity<>(shopService.getItemList(), HttpStatus.OK);
    }
}
