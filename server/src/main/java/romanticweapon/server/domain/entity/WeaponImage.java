package romanticweapon.server.domain.entity;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Getter @Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class WeaponImage {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String fileName;
    private String filePath;
    
    @Builder
    public WeaponImage(String fileName, String filePath) {
        this.fileName = fileName;
        this.filePath = filePath;
    }
}
