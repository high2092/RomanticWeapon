package romanticweapon.server.controller.auth;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import romanticweapon.server.domain.dto.oauth.TokenInfo;
import romanticweapon.server.domain.dto.request.auth.UserLoginRequestDto;
import romanticweapon.server.domain.dto.request.auth.UserRegisterRequestDto;
import romanticweapon.server.service.auth.UserService;
import romanticweapon.server.util.auth.SecurityUtil;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@Slf4j
@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginRequestDto userLoginRequestDto, HttpServletResponse response) {
        response.addCookie(SecurityUtil.getCookieWithAccessToken(
                userService.login(userLoginRequestDto.getId(), userLoginRequestDto.getPassword()))
        );
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/check-login")
    public ResponseEntity<?> isLogin() {
        String currentUserId = SecurityUtil.getCurrentUserId();
        log.info("current user id : {}", currentUserId);
        if(currentUserId.equals("anonymousUser")) return new ResponseEntity<>("로그인 되어있지 않습니다.",HttpStatus.UNAUTHORIZED);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody UserRegisterRequestDto request) throws Exception {
        userService.register(request);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
