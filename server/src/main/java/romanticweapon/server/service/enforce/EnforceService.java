package romanticweapon.server.service.enforce;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import romanticweapon.server.domain.dto.request.weapon.RefineRequestDto;
import romanticweapon.server.domain.entity.user.User;
import romanticweapon.server.domain.entity.user.UserInventory;
import romanticweapon.server.domain.entity.weapon.Weapon;
import romanticweapon.server.domain.enumm.item.ItemCode;
import romanticweapon.server.domain.enumm.weapon.WeaponType;
import romanticweapon.server.exception.exception.NoSuchItemException;
import romanticweapon.server.exception.exception.NotEnoughGoldException;
import romanticweapon.server.repository.auth.UserRepository;
import romanticweapon.server.repository.inventory.UserInventoryRepository;
import romanticweapon.server.repository.weapon.WeaponImageRepository;
import romanticweapon.server.repository.weapon.WeaponRepository;
import romanticweapon.server.util.staticc.Item;
import romanticweapon.server.util.staticc.WeaponConstant;

import java.security.SecureRandom;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class EnforceService {

    private final WeaponRepository weaponRepository;
    private final WeaponImageRepository weaponImageRepository;

    private final UserRepository userRepository;
    private final UserInventoryRepository userInventoryRepository;
    @Transactional
    public Weapon getWeaponByUser(User user) {
        Optional<Weapon> byUser = weaponRepository.findByUser(user);
        return byUser.get();
    }

    @Transactional
    public Weapon enforce(User user, RefineRequestDto refineRequestDto) {
        validateShield(user, refineRequestDto);
        Weapon weapon = getWeaponByUser(user);

        payEnforceGoldFromUser(user, weapon);
        Random random = new SecureRandom();
        double number = random.nextDouble();//     0.0 ~ 1.0

        Long currentWeaponUpgrade = weapon.getUpgrade();
        Long nextUpgrade = getNextUpgrade(weapon, number, 1 - currentWeaponUpgrade * 0.05, refineRequestDto);
        return getResultWeapon(user, weapon, nextUpgrade);
    }

    private void validateShield(User user, RefineRequestDto refineRequestDto) {
        if(refineRequestDto.getUse().contains(ItemCode.PROTECT_SHIELD.getValue())) {
            Optional<UserInventory> userInventoryOptional = userInventoryRepository
                    .findByIdxAndUser(ItemCode.PROTECT_SHIELD.getValue(), user);
            if(userInventoryOptional.isEmpty()) {
                throw new NoSuchItemException("보유한 프로텍트 실드가 없습니다.");
            }
            UserInventory userInventory = userInventoryOptional.get();
            if(userInventory.getAmount() <= 0) {
                throw new NoSuchItemException("보유한 프로텍트 실드가 없습니다.");
            }
            userInventory.setAmount(userInventory.getAmount() - 1);
            userInventoryRepository.save(userInventory);
        }
    }

    private void payEnforceGoldFromUser(User user, Weapon weapon) {
        if (user.getGold() < weapon.getEnforceCost()) {
            throw new NotEnoughGoldException("골드가 부족합니다.");
        }
        user.setGold(user.getGold() - weapon.getEnforceCost());
        userRepository.save(user);
    }

    private Weapon getResultWeapon(User user, Weapon weapon, Long nextUpgrade) {
        Weapon resultWeapon = Weapon.builder()
                .upgrade((long) nextUpgrade)
                .enforceCost((long) WeaponConstant.SWORD_ENFORCE[Math.toIntExact(nextUpgrade)])
                .weaponImage(weaponImageRepository.findByTypeAndUpgrade(weapon.getType(), nextUpgrade).get())
                .type(weapon.getType())
                .name(WeaponConstant.SWORD_NAME[Math.toIntExact(nextUpgrade)])
                .user(user)
                .price(WeaponConstant.SWORD_PRICE[Math.toIntExact(nextUpgrade)])
                .build();
        weaponRepository.delete(weapon);
        weaponRepository.save(resultWeapon);
        return resultWeapon;
    }

    private static Long getNextUpgrade(Weapon weapon, double number, Double successNumber, RefineRequestDto refineRequestDto) {
        Long nextUpgrade = weapon.getUpgrade();
        if(successNumber >= number) { // 성공
            nextUpgrade = nextUpgrade + 1L;
        }
        else {
            if(weapon.getUpgrade() % 5 != 0 && !(refineRequestDto.getUse().contains(ItemCode.PROTECT_SHIELD.getValue()))) {
                nextUpgrade = nextUpgrade - 1L;
            }
        }
        return nextUpgrade;
    }

    @Transactional
    @Deprecated
    public Weapon sellWeapon(User user, Weapon weapon) {
        Weapon newWeapon = Weapon.builder()
                .enforceCost(Long.valueOf(WeaponConstant.SWORD_ENFORCE[0]))
                .weaponImage(weaponImageRepository.findByTypeAndUpgrade(WeaponType.SWORD, 0L).get())
                .type(WeaponType.SWORD)
                .name(WeaponConstant.SWORD_NAME[0])
                .price(WeaponConstant.SWORD_PRICE[0])
                .user(user)
                .upgrade(0L)
                .build();

//        user.setGold(user.getGold() + weapon.getPrice());
        userRepository.save(user);
        weaponRepository.delete(weapon);

        return weaponRepository.save(newWeapon);
    }
//    public
}
