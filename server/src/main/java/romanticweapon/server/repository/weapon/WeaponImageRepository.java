package romanticweapon.server.repository.weapon;

import org.springframework.data.jpa.repository.JpaRepository;
import romanticweapon.server.domain.entity.weapon.WeaponImage;
import romanticweapon.server.domain.enumm.weapon.WeaponType;

import java.util.Optional;

public interface WeaponImageRepository extends JpaRepository<WeaponImage, Long> {
    Optional<WeaponImage> findByFileName(String fileName);
    Optional<WeaponImage> findByTypeAndUpgrade(WeaponType type, Long upgrade);
}
