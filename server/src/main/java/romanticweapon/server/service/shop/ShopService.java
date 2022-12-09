package romanticweapon.server.service.shop;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import romanticweapon.server.domain.dto.response.InventoryInfoResponseDto;
import romanticweapon.server.domain.entity.shop.Shop;
import romanticweapon.server.domain.entity.user.User;
import romanticweapon.server.domain.entity.user.UserInventory;
import romanticweapon.server.exception.exception.NotEnoughGoldException;
import romanticweapon.server.repository.auth.UserRepository;
import romanticweapon.server.repository.inventory.UserInventoryRepository;
import romanticweapon.server.repository.shop.ShopRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ShopService {

    private final UserRepository userRepository;
    private final UserInventoryRepository userInventoryRepository;
    private final ShopRepository shopRepository;

    public List<Shop> getItemList() {
        return shopRepository.findAll();
    }

    @Transactional
    public InventoryInfoResponseDto buyItem(User user, int idx) {
        Shop shop = shopRepository.findByIdx((long) idx).get();
        UserInventory userInventory = user.getUserInventory();
        if(userInventory.getGold() < shop.getPrice()) {
            throw new NotEnoughGoldException("골드가 부족합니다. (프로텍트 실드 구매 실패)");
        }
        userInventory.setProtectShield(userInventory.getProtectShield() + 1);
        userInventory.setGold(userInventory.getGold() - shop.getPrice());
        userInventoryRepository.save(userInventory);
        return new InventoryInfoResponseDto(userInventory.getGold(), userInventory.getProtectShield());

    }
}
