package romanticweapon.server.domain.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import romanticweapon.server.domain.vo.ItemInInventory;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InventoryInfoResponseDto {
    private Long gold;
    private List<ItemInInventory> inventory = new ArrayList<>();
}
