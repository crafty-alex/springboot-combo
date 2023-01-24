package application.controller;

import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;


@RestController
@CrossOrigin("${client.server.origin}")
@Slf4j
public class AttestationController {


    @GetMapping(value = "/get-attestation/{id}")
    public ResponseEntity<InputStreamResource> fetchAttestation(@PathVariable(name = "id") int id) {

        // récupération attestation
        InputStream is = new ByteArrayInputStream("hello".getBytes());

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment;filename=" + "filename")
                .contentType(MediaType.valueOf("application/pdf"))
                .body(new InputStreamResource(is));
    }


    @GetMapping(value = "/get-attestations/{ids}", produces = "application/zip")
    public ResponseEntity<byte[]> fetchAttestations(@PathVariable(name = "ids") List<Integer> ids) throws IOException {

        ByteArrayOutputStream bOut = new ByteArrayOutputStream();
        ZipOutputStream zipOut = new ZipOutputStream(bOut);
        Map<String, InputStream> map = new HashMap<>();

        for (int id : ids) {


            // récupération attestation
            InputStream is = new ByteArrayInputStream("hello".getBytes());


            try {
                map.put("filename", is);
            } catch (NullPointerException e) {
                log.debug("Attestation non active.");
            }
        }
        for (Map.Entry<String, InputStream> entry : map.entrySet()) {
            ZipEntry zipEntry = new ZipEntry(entry.getKey());
            zipOut.putNextEntry(zipEntry);
            IOUtils.copy(entry.getValue(), zipOut);
            entry.getValue().close();
        }
        zipOut.close();

        if (bOut.size() == 0) {
            return null;
        } else {
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION,
                            "attachment;filename=" + "attestations.zip")
                    .contentType(MediaType.valueOf("application/zip"))
                    .body(bOut.toByteArray());
        }
    }
}
