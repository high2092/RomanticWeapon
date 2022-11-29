package romanticweapon.server.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import romanticweapon.server.domain.dto.TestDto;
import romanticweapon.server.domain.dto.request.UserLoginRequestDto;
import romanticweapon.server.domain.entity.TestEntity;
import romanticweapon.server.domain.entity.User;
import romanticweapon.server.repository.UserRepository;
import romanticweapon.server.service.TestService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/test")
public class TestController {
    private final TestService testService;
    private final UserRepository userRepository;

    @PostMapping("/post")
    public ResponseEntity<?> post(@RequestBody TestDto testDto) {
        TestEntity testEntity = testService.testSave(testDto);
        return new ResponseEntity<>(testEntity, HttpStatus.OK);
    }

    @PostMapping("/saveuser")
    public String saveUser(@RequestBody UserLoginRequestDto userLoginRequestDto) {
        List<String> roles = new ArrayList<>();
        roles.add("USER");
        User user = new User(userLoginRequestDto.getUserId(), userLoginRequestDto.getPassword(), roles);
        userRepository.save(user);
        return "OK";
    }
}
