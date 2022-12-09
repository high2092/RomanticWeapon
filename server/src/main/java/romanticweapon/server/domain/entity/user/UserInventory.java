package romanticweapon.server.domain.entity.user;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserInventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int idx;

    private int amount;

    @OneToOne
    @JoinColumn(name = "USER_ID")
    private User user;

    @Builder
    public UserInventory(int idx, int amount, User user) {
        this.idx = idx;
        this.amount = amount;
        this.user = user;
    }
}
