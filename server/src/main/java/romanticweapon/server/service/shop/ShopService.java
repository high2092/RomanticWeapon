package romanticweapon.server.service.shop;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import romanticweapon.server.domain.dto.response.AfterBuyResponseDto;
import romanticweapon.server.domain.entity.user.User;
import romanticweapon.server.domain.entity.user.UserInventory;
import romanticweapon.server.exception.exception.NotEnoughGoldException;
import romanticweapon.server.repository.auth.UserRepository;
import romanticweapon.server.repository.inventory.UserInventoryRepository;
import romanticweapon.server.repository.item.ItemImageRepository;
import romanticweapon.server.util.staticc.Item;
import romanticweapon.server.util.staticc.ShopConstant;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ShopService {

    private final UserRepository userRepository;
    private final UserInventoryRepository userInventoryRepository;

    private final ItemImageRepository itemImageRepository;
    public List<Item> getItemList() {
        List<Item> items = new ArrayList<>();
        items.addAll(Arrays.asList(ShopConstant.itemList));
        items.remove(null);
        items.stream()
                .forEach(item -> {
                    item.setImgUrl(itemImageRepository.findById(item.getIdx()).get().getFilePath());
                });
        return items;
    }

    @Transactional
    public AfterBuyResponseDto buyItem(User user, int idx) {
        Item item = ShopConstant.itemList[idx];
        UserInventory userInventory;

        if(userInventoryRepository.findByIdxAndUser(idx, user).isPresent()) {
            userInventory = userInventoryRepository.findByIdxAndUser(idx, user).get();
        }
        else {
            userInventory = UserInventory.builder()
                    .amount(0)
                    .idx(idx)
                    .user(user)
                    .build();
        }

        if(user.getGold() < item.getPrice()) {
            throw new NotEnoughGoldException("골드가 부족합니다. (프로텍트 실드 구매 실패)");
        }
        userInventory.setAmount(userInventory.getAmount()+ 1);
        user.setGold(user.getGold() - item.getPrice());
        userInventoryRepository.save(userInventory);
        userRepository.save(user);
        return new AfterBuyResponseDto(user.getGold(), userInventory.getAmount());

    }
}
