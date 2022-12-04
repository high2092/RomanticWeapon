package romanticweapon.server.domain.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Weapon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    private Long upgrade;

    private Long price;

    private String name;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "WEAPON_IMAGE_ID")
    private WeaponImage weaponImage;

}
