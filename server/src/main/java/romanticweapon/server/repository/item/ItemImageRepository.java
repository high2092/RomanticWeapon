package romanticweapon.server.repository.item;

import org.springframework.data.jpa.repository.JpaRepository;
import romanticweapon.server.domain.entity.item.ItemImage;
import romanticweapon.server.domain.entity.weapon.WeaponImage;

import java.util.Optional;

public interface ItemImageRepository extends JpaRepository<ItemImage, Long> {
    Optional<ItemImage> findByFileName(String fileName);
}
