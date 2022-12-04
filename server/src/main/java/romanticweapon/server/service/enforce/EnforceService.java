package romanticweapon.server.service.enforce;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import romanticweapon.server.domain.entity.User;
import romanticweapon.server.domain.entity.weapon.Weapon;
import romanticweapon.server.repository.UserRepository;
import romanticweapon.server.repository.WeaponImageRepository;
import romanticweapon.server.repository.WeaponRepository;
import romanticweapon.server.util.SecurityUtil;
import romanticweapon.server.util.staticc.WeaponConstant;

import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class EnforceService {

    private final WeaponRepository weaponRepository;
    private final WeaponImageRepository weaponImageRepository;

    private final UserRepository userRepository;
    @Transactional
    public Weapon getWeaponByUser(User user) {
        Optional<Weapon> byUser = weaponRepository.findByUser(user);
        if (byUser.isEmpty()) {
            /* todo : 유저 무기 없음 */
            return byUser.get();
        } else {
            return byUser.get();
        }
    }

    @Transactional
    public Weapon enforce(User user) throws Exception {
        Weapon weapon = getWeaponByUser(user);

        if (user.getGold() < weapon.getEnforceCost()) {
            throw new Exception("골드가 부족합니다.");
        }

        user.setGold(user.getGold() - weapon.getEnforceCost());

        userRepository.save(user);
        long seed = System.currentTimeMillis();
        Random random = new Random(seed);
        random.setSeed(seed);
        double number = random.nextDouble();//     0.0 ~ 1.0

        Long currentWeaponUpgrade = weapon.getUpgrade();
        Double successNumber = 1 - currentWeaponUpgrade * 0.05; // 1강 = 0.95, 19 -> 20 = 0.05
        if (successNumber >= number) {
            Long nextUpgrade = weapon.getUpgrade() + 1L;
            Weapon upgradedWeapon = Weapon.builder()
                    .upgrade((long) nextUpgrade)
                    .enforceCost((long) WeaponConstant.SWORD_ENFORCE[Math.toIntExact(nextUpgrade)])
                    .weaponImage(weaponImageRepository.findByTypeAndUpgrade(weapon.getType(), nextUpgrade).get())
                    .type(weapon.getType())
                    .name(WeaponConstant.SWORD_NAME[Math.toIntExact(nextUpgrade)])
                    .user(user)
                    .price(WeaponConstant.SWORD_PRICE[Math.toIntExact(nextUpgrade)])
                    .build();
            weaponRepository.delete(weapon);
            weaponRepository.save(upgradedWeapon);
            return upgradedWeapon;
        }
        else {
            Long nextUpgrade = weapon.getUpgrade() - 1L;
            Weapon upgradedWeapon = Weapon.builder()
                    .upgrade((long) nextUpgrade)
                    .enforceCost((long) WeaponConstant.SWORD_ENFORCE[Math.toIntExact(nextUpgrade)])
                    .weaponImage(weaponImageRepository.findByTypeAndUpgrade(weapon.getType(), nextUpgrade).get())
                    .type(weapon.getType())
                    .name(WeaponConstant.SWORD_NAME[Math.toIntExact(nextUpgrade)])
                    .user(user)
                    .price(WeaponConstant.SWORD_PRICE[Math.toIntExact(nextUpgrade)])
                    .build();
            weaponRepository.delete(weapon);
            weaponRepository.save(upgradedWeapon);
            return upgradedWeapon;
        }
    }
//    public
}
