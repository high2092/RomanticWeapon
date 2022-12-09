package romanticweapon.server.util.staticc;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Builder
@Getter
@Setter
public class Item {
    private Long idx;
    private String name;
    private int price;
    private String desc;
}
