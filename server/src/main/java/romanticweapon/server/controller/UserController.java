package romanticweapon.server.controller;

import antlr.Token;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import romanticweapon.server.domain.dto.TokenInfo;
import romanticweapon.server.domain.dto.request.UserLoginRequestDto;
import romanticweapon.server.domain.dto.request.UserRegisterRequestDto;
import romanticweapon.server.service.UserService;

import javax.validation.Valid;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @PostMapping("/login")
    public TokenInfo login(@RequestBody UserLoginRequestDto userLoginRequestDto) {
        return userService.login(userLoginRequestDto.getId(), userLoginRequestDto.getPassword());
    }

    @GetMapping("/main")
    public String isLogin() {
        return "OK";
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.OK)
    public String register(@Valid @RequestBody UserRegisterRequestDto request) throws Exception {
        return userService.register(request);
    }

}
