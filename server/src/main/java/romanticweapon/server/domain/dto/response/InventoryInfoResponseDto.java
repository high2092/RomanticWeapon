package romanticweapon.server.domain.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class InventoryInfoResponseDto {
    private Long gold;
    private int shield;
}
