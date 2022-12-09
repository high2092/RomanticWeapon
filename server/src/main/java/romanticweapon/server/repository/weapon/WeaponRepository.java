package romanticweapon.server.repository.weapon;

import org.springframework.data.jpa.repository.JpaRepository;
import romanticweapon.server.domain.entity.user.User;
import romanticweapon.server.domain.entity.weapon.Weapon;

import java.util.Optional;

public interface WeaponRepository extends JpaRepository<Weapon, Long> {
    Optional<Weapon> findByUser(User user);
}
