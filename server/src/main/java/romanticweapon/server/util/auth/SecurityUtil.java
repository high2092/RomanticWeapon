package romanticweapon.server.util.auth;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import romanticweapon.server.domain.dto.oauth.TokenInfo;

import javax.servlet.http.Cookie;

public class SecurityUtil {
    public static String getCurrentUserId() {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getName() == null) {
            return "No User Found";
        }
        return authentication.getName();
    }

    public static Cookie getCookieWithAccessToken(TokenInfo tokenInfo) {
        Cookie cookie = new Cookie("accessToken", tokenInfo.getAccessToken());
        cookie.setMaxAge(30 * 60); // 1 day
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        return cookie;
    }
}
