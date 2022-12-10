package romanticweapon.server.repository.inventory;

import org.springframework.data.jpa.repository.JpaRepository;
import romanticweapon.server.domain.entity.user.User;
import romanticweapon.server.domain.entity.user.UserInventory;

import java.util.List;
import java.util.Optional;

public interface UserInventoryRepository extends JpaRepository<UserInventory, Long> {
    Optional<UserInventory> findByIdxAndUser(int idx, User user);

    List<UserInventory> findByUser(User user);
}
