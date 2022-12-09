package romanticweapon.server.domain.entity.weapon;

import lombok.*;
import net.minidev.json.annotate.JsonIgnore;
import romanticweapon.server.domain.entity.user.User;
import romanticweapon.server.domain.enumm.weapon.WeaponType;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Weapon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "USER_ID")
    @JsonIgnore
    private User user;

    @Enumerated(EnumType.STRING)
    private WeaponType type;
    private Long upgrade;

    private Long enforceCost;

    private Long price;

    private String name;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "WEAPON_IMAGE_ID")
    @JsonIgnore
    private WeaponImage weaponImage;

    @Builder
    public Weapon(User user, WeaponType type, Long upgrade, Long enforceCost, Long price, String name, WeaponImage weaponImage) {
        this.user = user;
        this.type = type;
        this.upgrade = upgrade;
        this.enforceCost = enforceCost;
        this.price = price;
        this.name = name;
        this.weaponImage = weaponImage;
    }
}
