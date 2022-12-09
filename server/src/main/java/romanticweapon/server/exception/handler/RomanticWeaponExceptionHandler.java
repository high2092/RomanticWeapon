package romanticweapon.server.exception.handler;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import romanticweapon.server.domain.enumm.error.ErrorCode;
import romanticweapon.server.exception.exception.DuplicateUserIdException;
import romanticweapon.server.exception.exception.DuplicateUserNameException;
import romanticweapon.server.exception.exception.NotEnoughGoldException;

@RestControllerAdvice
@Slf4j
public class RomanticWeaponExceptionHandler {

    @ExceptionHandler(Exception.class)
    public void unknownException(Exception e) {
        log.error("UNKNOWN EXCEPTION : {}\n{}", e.getClass().getSimpleName(), e.getCause());
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity badCredentialException() {
        return new ResponseEntity("올바르지 않은 계정 정보입니다.",HttpStatus.FORBIDDEN); // 403
    }

    @ExceptionHandler(DuplicateUserIdException.class)
    public ResponseEntity duplicateUserIdException(DuplicateUserIdException e) {
        return new ResponseEntity(e.getMessage(), HttpStatus.valueOf(ErrorCode.DUPLICATE_USER_ID.getValue()));
    }

    @ExceptionHandler(DuplicateUserNameException.class)
    public ResponseEntity duplicateUserNameException(DuplicateUserNameException e) {
        return new ResponseEntity(e.getMessage(), HttpStatus.valueOf(ErrorCode.DUPLICATE_USER_NAME.getValue()));
    }
    @ExceptionHandler(NotEnoughGoldException.class)
    public ResponseEntity notEnoughGoldException(NotEnoughGoldException e) {
        return new ResponseEntity(e.getMessage(), HttpStatus.valueOf(ErrorCode.NOT_ENOUGH_GOLD.getValue()));
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity methodNotSupportedException() {
        return new ResponseEntity(HttpStatus.METHOD_NOT_ALLOWED);
    }
}
