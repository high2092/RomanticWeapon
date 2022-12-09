package romanticweapon.server.service.auth;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import romanticweapon.server.config.auth.JwtTokenProvider;
import romanticweapon.server.domain.dto.oauth.TokenInfo;
import romanticweapon.server.domain.dto.request.auth.UserRegisterRequestDto;
import romanticweapon.server.domain.entity.User;
import romanticweapon.server.domain.entity.weapon.Weapon;
import romanticweapon.server.domain.enumm.weapon.WeaponType;
import romanticweapon.server.exception.exception.DuplicateUserIdException;
import romanticweapon.server.exception.exception.DuplicateUserNameException;
import romanticweapon.server.repository.auth.UserRepository;
import romanticweapon.server.repository.weapon.WeaponImageRepository;
import romanticweapon.server.repository.weapon.WeaponRepository;
import romanticweapon.server.util.auth.SecurityUtil;
import romanticweapon.server.util.staticc.WeaponConstant;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;
    private final WeaponImageRepository weaponImageRepository;
    private final WeaponRepository weaponRepository;

    @Transactional
    public TokenInfo login(String userId, String password) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userId, password);
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        TokenInfo tokenInfo = jwtTokenProvider.generateToken(authentication);

        return tokenInfo;

    }

    @Transactional
    public String register(UserRegisterRequestDto userRegisterRequestDto) {
        if(userRegisterRequestDto.getIsOAuth() == true) {
            if(userRepository.findByUserId(userRegisterRequestDto.getId()).isPresent()) {

            }
            else {
                User user = userRepository.save(userRegisterRequestDto.toEntity());
                user.encodePassword(passwordEncoder);
            }

            TokenInfo login = login(userRegisterRequestDto.getId(), userRegisterRequestDto.getPassword());
            return login.getAccessToken();
        }

        checkRequestInfoIsDuplicated(userRegisterRequestDto);
        User user = userRepository.save(userRegisterRequestDto.toEntity());
        setBasicWeaponToUser(user);
        user.encodePassword(passwordEncoder);

        return user.getUserId();
    }

    private void setBasicWeaponToUser(User user) {
        Weapon weapon = Weapon.builder()
                .enforceCost(Long.valueOf(WeaponConstant.SWORD_ENFORCE[0]))
                .weaponImage(weaponImageRepository.findByTypeAndUpgrade(WeaponType.SWORD, 0L).get())
                .type(WeaponType.SWORD)
                .name(WeaponConstant.SWORD_NAME[0])
                .price(WeaponConstant.SWORD_PRICE[0])
                .user(user)
                .upgrade(0L)
                .build();
        weaponRepository.save(weapon);
    }

    private void checkRequestInfoIsDuplicated(UserRegisterRequestDto userRegisterRequestDto) {
        if(userRepository.findByUserId(userRegisterRequestDto.getId()).isPresent()) {
            throw new DuplicateUserIdException("이미 존재하는 UserID 입니다.");
        }

        if(userRepository.findByUsername(userRegisterRequestDto.getUsername()).isPresent()) {
            throw new DuplicateUserNameException("이미 존재하는 UserName 입니다.");
        }
    }

    @Transactional
    public User findUserByAuthentication() {
        String currentUserId = SecurityUtil.getCurrentUserId();
        log.info("current user : {}", currentUserId);
        return userRepository.findByUserId(currentUserId).get();
    }

    @Transactional
    public void setAchievement(User user, Long upgrade) {
        user.setTargetUpgrade(upgrade);
        userRepository.save(user);
    }
}
