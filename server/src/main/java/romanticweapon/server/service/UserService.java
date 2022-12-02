package romanticweapon.server.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import romanticweapon.server.config.auth.JwtTokenProvider;
import romanticweapon.server.domain.dto.TokenInfo;
import romanticweapon.server.domain.dto.request.UserRegisterRequestDto;
import romanticweapon.server.domain.entity.User;
import romanticweapon.server.repository.UserRepository;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public TokenInfo login(String userId, String password) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userId, password);

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        TokenInfo tokenInfo = jwtTokenProvider.generateToken(authentication);

        return tokenInfo;

    }

    @Transactional
    public String register(UserRegisterRequestDto userRegisterRequestDto) throws Exception {
        if(userRepository.findByUserId(userRegisterRequestDto.getId()).isPresent()) {
            throw new Exception("이미 존재하는 게정입니다.");
        }

        if(userRepository.findByNickName(userRegisterRequestDto.getNickName()).isPresent()) {
            throw new Exception("이미 존재하는 닉네임입니다");
        }

        User user = userRepository.save(userRegisterRequestDto.toEntity());
        user.encodePassword(passwordEncoder);

        return user.getUserId();
    }
}