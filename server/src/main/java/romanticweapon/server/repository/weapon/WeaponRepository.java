package romanticweapon.server.repository.weapon;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import romanticweapon.server.domain.entity.user.User;
import romanticweapon.server.domain.entity.weapon.Weapon;

import javax.persistence.Entity;
import java.util.List;
import java.util.Optional;

public interface WeaponRepository extends JpaRepository<Weapon, Long> {
    Optional<Weapon> findByUser(User user);

    @EntityGraph(attributePaths = {"user"})
    Page<Weapon> findAll(Pageable pageable);
}
