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
import romanticweapon.server.util.SecurityUtil;

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
        TokenInfo login = userService.login(userLoginRequestDto.getId(), userLoginRequestDto.getPassword());
        Cookie cookie = new Cookie("accessToken", login.getAccessToken());
        cookie.setMaxAge(24 * 60 * 60); // 1 day
        cookie.setHttpOnly(true);
        cookie.setPath("/");

        response.addCookie(cookie);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/check-login")
    public ResponseEntity<?> isLogin() {
        String currentUserId = SecurityUtil.getCurrentUserId();
        log.info("{}", currentUserId);
        if(currentUserId.equals("anonymousUser")) return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody UserRegisterRequestDto request) throws Exception {
        userService.register(request);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}