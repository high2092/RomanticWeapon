package romanticweapon.server.domain.oauth;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class GoogleUser {
    public String id;
    public String email;
    @JsonProperty(value = "verified_email")
    public Boolean verifiedEmail;
    public String name;
    @JsonProperty(value = "given_name")
    public String givenName;
    @JsonProperty(value = "family_name")
    public String familyName;
    public String picture;
    public String locale;
}