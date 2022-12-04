package romanticweapon.server.domain.entity.weapon;

import lombok.*;
import romanticweapon.server.domain.enumm.weapon.WeaponType;

import javax.persistence.*;

@Entity
@Getter @Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class WeaponImage {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String fileName;
    private String filePath;

    @Enumerated(EnumType.STRING)
    private WeaponType type;

    private Long upgrade;

    @Builder
    public WeaponImage(String fileName, String filePath, WeaponType type, Long upgrade) {
        this.fileName = fileName;
        this.filePath = filePath;
        this.type = type;
        this.upgrade = upgrade;
    }
}
