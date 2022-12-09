package romanticweapon.server.domain.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import romanticweapon.server.util.staticc.Item;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class SalesListResponseDto {
    private List<Item> salesList;
}
