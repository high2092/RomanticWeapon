package romanticweapon.server.exception.handler;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import romanticweapon.server.exception.exception.DuplicateUserIdException;

@RestControllerAdvice
@Slf4j
public class RomanticWeaponExceptionHandler {

    @ExceptionHandler(Exception.class)
    public void unknownException(Exception e) {
        log.error("UNKNOWN EXCEPTION : {}", e.getClass().getSimpleName());
        return;
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity badCredentialException() {
        return new ResponseEntity("올바르지 않은 계정 정보입니다.",HttpStatus.FORBIDDEN); // 403
    }

    @ExceptionHandler(DuplicateUserIdException.class)
    public ResponseEntity duplicateUserIdException(DuplicateUserIdException e) {
        return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
    }
}
