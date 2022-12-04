package romanticweapon.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import romanticweapon.server.domain.entity.WeaponImage;

import javax.swing.text.html.Option;
import java.util.Optional;

public interface WeaponImageRepository extends JpaRepository<WeaponImage, Long> {
    Optional<WeaponImage> findByFileName(String fileName);
}
