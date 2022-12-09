package romanticweapon.server.repository.inventory;

import org.springframework.data.jpa.repository.JpaRepository;
import romanticweapon.server.domain.entity.user.UserInventory;

public interface UserInventoryRepository extends JpaRepository<UserInventory, Long> {
}
