package romanticweapon.server.domain.entity.user;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import romanticweapon.server.domain.enumm.auth.Role;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @Column(updatable = false, unique = true, nullable = false, length = 32)
    private String userId;

    @Column(nullable = false, length = 191)
    private String password;

    @Column(length = 12)
    private String username;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Column
    private Long targetUpgrade;

    @Column
    private Long gold;

    @OneToMany(mappedBy = "user")
    private List<UserInventory> userInventory = new ArrayList<>();

    @Builder
    public User(Long gold, String userId, String password, String username, Role role, Long targetUpgrade) {
        this.gold = gold;
        this.userId = userId;
        this.password = password;
        this.username = username;
        this.role = role;
        this.targetUpgrade = targetUpgrade;
    }

    @Override
    public String getUsername() {
        return userId;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public void encodePassword(PasswordEncoder passwordEncoder) {
        this.password = passwordEncoder.encode(password);
    }
}
