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
    private String description;
    private String imgUrl;

    public Item(Long idx, String name, int price, String description) {
        this.idx = idx;
        this.name = name;
        this.price = price;
        this.description = description;
    }
}
