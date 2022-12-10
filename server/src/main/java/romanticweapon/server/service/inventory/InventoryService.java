package romanticweapon.server.service.inventory;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import romanticweapon.server.domain.dto.response.InventoryInfoResponseDto;
import romanticweapon.server.domain.entity.user.User;
import romanticweapon.server.domain.entity.user.UserInventory;
import romanticweapon.server.domain.enumm.item.ItemCode;
import romanticweapon.server.domain.vo.ItemInInventory;
import romanticweapon.server.repository.inventory.UserInventoryRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class InventoryService {

    private final UserInventoryRepository userInventoryRepository;
    public InventoryInfoResponseDto getInventoryInfo(User user) {
        List<UserInventory> userInventory = user.getUserInventory();
        InventoryInfoResponseDto inventoryInfoResponseDto = new InventoryInfoResponseDto();
        inventoryInfoResponseDto.setGold(user.getGold());
        userInventoryRepository.findByUser(user)
                .stream()
                .forEach(inventory -> {
                    inventoryInfoResponseDto.getInventory()
                            .add(new ItemInInventory(inventory.getIdx(), inventory.getAmount()));
                });
        return inventoryInfoResponseDto;
    }
}
