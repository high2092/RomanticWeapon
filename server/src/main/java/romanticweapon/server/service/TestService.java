package romanticweapon.server.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import romanticweapon.server.domain.dto.TestDto;
import romanticweapon.server.domain.entity.TestEntity;
import romanticweapon.server.repository.TestRepository;

@Service
@RequiredArgsConstructor
public class TestService {
    private final TestRepository testRepository;

    public TestEntity testSave(TestDto testDto) {
        TestEntity testEntity = TestEntity.builder()
                .name(testDto.getName())
                .build();

        testRepository.save(testEntity);
        return testEntity;
    }
}
