package romanticweapon.server.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import romanticweapon.server.domain.entity.weapon.WeaponImage;
import romanticweapon.server.domain.enumm.weapon.WeaponType;
import romanticweapon.server.repository.WeaponImageRepository;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class WeaponImageInit {

    private final ApplicationContext applicationContext;

    private final WeaponImageRepository weaponImageRepository;

    @Value("classpath:static/image/*")
    private Resource[] resources;

    @Value("${custom.server-url}")
    private String serverUrl;

    private List<String> imageFileNameList = new ArrayList<>();
    private List<String> imageFilePathList = new ArrayList<>();

    @PostConstruct
    public void init() throws IOException {
        for (Resource resource : resources) {
            ClassPathResource classPathResource = new ClassPathResource("/image/" + resource.getFilename());
            String fullFilePath = serverUrl + "/" + classPathResource.getPath();
            imageFileNameList.add(resource.getFilename());
            imageFilePathList.add(fullFilePath);
        }

        Collections.sort(imageFileNameList);
        Collections.sort(imageFilePathList);

        for(int i = 0 ; i < imageFileNameList.size() ; i++) {
            String currentFileName = imageFileNameList.get(i);
            String currentFilePath = imageFilePathList.get(i);

            saveImageIfNotExist(currentFileName, currentFilePath, i);
        }
    }

    private void saveImageIfNotExist(String currentFileName, String currentFilePath, int idx) {
        if(!weaponImageRepository.findByFileName(currentFileName).isPresent()) {
            WeaponImage weaponImage = WeaponImage.builder()
                    .fileName(currentFileName)
                    .filePath(currentFilePath)
                    .type(WeaponType.SWORD)
                    .upgrade((long) idx)
                    .build();
            weaponImageRepository.save(weaponImage);
        }
    }
}
