package romanticweapon.server.config.init;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import romanticweapon.server.domain.entity.shop.Shop;
import romanticweapon.server.domain.entity.weapon.WeaponImage;
import romanticweapon.server.domain.enumm.weapon.WeaponType;
import romanticweapon.server.repository.shop.ShopRepository;

import javax.annotation.PostConstruct;

@Component
@RequiredArgsConstructor
public class ShopInit {
    private final ShopRepository shopRepository;

    @PostConstruct
    private void saveItemIfNotExist() {
        if(shopRepository.findAll().size() == 0) {
            Shop shop = Shop.builder()
                    .idx(1L)
                    .itemName("프로텍트 쉴드")
                    .price(500000)
                    .description("강화로 인한 하락을 1회 막아줍니다.")
                    .build();

            shopRepository.save(shop);
        }
    }
}
