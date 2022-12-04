package romanticweapon.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import romanticweapon.server.domain.entity.User;
import romanticweapon.server.domain.entity.weapon.Weapon;

import java.util.Optional;

public interface WeaponRepository extends JpaRepository<Weapon, Long> {
    Optional<Weapon> findByUser(User user);
}
