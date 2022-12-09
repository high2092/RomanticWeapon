package romanticweapon.server.domain.entity.shop;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Shop {
    @Id
    @Column(unique = true)
    private Long idx;

    private String itemName;

    private int price;

    private String description;

    @Builder
    public Shop(Long idx, String itemName, int price, String description) {
        this.idx = idx;
        this.itemName = itemName;
        this.price = price;
        this.description = description;
    }
}
