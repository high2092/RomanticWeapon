package romanticweapon.server.domain.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class TestEntity {
    @Id
    @GeneratedValue
    private Long id;

    private String name;

    @Builder
    public TestEntity(Long id, String name) {
        this.id = id;
        this.name = name;
    }
}
