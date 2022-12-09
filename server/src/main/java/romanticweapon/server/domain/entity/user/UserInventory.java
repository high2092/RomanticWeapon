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

    @Column(columnDefinition = "LONG DEFAULT 0")
    private int protectShield;

    @Column(columnDefinition = "LONG DEFAULT 99999")
    private Long gold;

    @OneToOne(mappedBy = "userInventory")
    private User user;

    @Builder
    public UserInventory(int protectShield, Long gold) {
        this.protectShield = protectShield;
        this.gold = gold;
    }
}
