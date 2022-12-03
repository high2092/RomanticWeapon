package romanticweapon.server.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import romanticweapon.server.domain.dto.TokenInfo;
import romanticweapon.server.domain.dto.request.UserLoginRequestDto;
import romanticweapon.server.domain.dto.request.UserRegisterRequestDto;
import romanticweapon.server.service.UserService;
import romanticweapon.server.util.SecurityUtil;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
public class UserController {

    private final UserService userService;
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginRequestDto userLoginRequestDto, HttpServletResponse response) {
        TokenInfo login = userService.login(userLoginRequestDto.getId(), userLoginRequestDto.getPassword());
        Cookie cookie = new Cookie("accessToken", login.getAccessToken());
        cookie.setMaxAge(24 * 60 * 60); // 1 day
        cookie.setHttpOnly(true);
        response.addCookie(cookie);
        return new ResponseEntity<>("OK", HttpStatus.OK);
    }

    @GetMapping("/check-login")
    public Boolean isLogin() {
        String currentUserId = SecurityUtil.getCurrentUserId();
        log.info("{}", currentUserId);
        if(currentUserId.equals("anonymousUser")) return false;
        return true;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.OK)
    public String register(@Valid @RequestBody UserRegisterRequestDto request) throws Exception {
        return userService.register(request);
    }

}
