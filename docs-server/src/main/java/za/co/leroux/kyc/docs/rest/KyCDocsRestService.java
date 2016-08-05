package za.co.leroux.kyc.docs.rest;

import com.sendgrid.SendGridException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import za.co.leroux.kyc.docs.dao.ApplicationDAO;
import za.co.leroux.kyc.docs.exception.ResourceNotFoundException;
import za.co.leroux.kyc.docs.model.Application;
import za.co.leroux.kyc.docs.model.DocumentRequest;
import za.co.leroux.kyc.docs.service.KycDocsService;

/**
 * Created by Dirk le Roux on 2016/05/18.
 * <p>
 * The Java class will be hosted at the URI path "/car"
 */
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@Service
public class KyCDocsRestService {

    private static final Logger log = LoggerFactory.getLogger(KyCDocsRestService.class);

    public static final String ROOT = "upload-dir";

    private final ResourceLoader resourceLoader;

    @Autowired
    private ApplicationDAO applicationDAO;


    @Autowired
    private KycDocsService kycDocsService;

    @Autowired
    public KyCDocsRestService(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }

    @RequestMapping(method = RequestMethod.POST, value = "/io/upload/{applicationId}/{docRecTypeName}/")
    public DocumentRequest handleFileUpload(@PathVariable String applicationId, @PathVariable String docRecTypeName, @RequestParam("file") MultipartFile file,
                                   RedirectAttributes redirectAttributes) {

        if (!file.isEmpty()) {
            try {
                String fileName = applicationId + '-' +docRecTypeName + '-' +file.getOriginalFilename();
                redirectAttributes.addFlashAttribute("fileName", fileName);
                Path target = Paths.get(ROOT, fileName);
                System.out.println("target = " + target);
                Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);
                String message = "You successfully uploaded " + file.getOriginalFilename() + "!";
                redirectAttributes.addFlashAttribute("message",
                        message);
                DocumentRequest dr = kycDocsService.linkDocument(applicationId, docRecTypeName, fileName);
                return dr;
            } catch (IOException | RuntimeException e) {
                e.printStackTrace();
                String message = "Failed to upload " + file.getOriginalFilename() + " => " + e.getMessage();
                redirectAttributes.addFlashAttribute("message", message);
                return null;
            }
        } else {
            String message = "Failed to upload " + file.getOriginalFilename() + " because it was empty";
            redirectAttributes.addFlashAttribute("message", message);
            return null;
        }
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(method = RequestMethod.GET, value = "/io/markDocReqAsComplete/{applicationId}/{docRecTypeName}")
    public DocumentRequest markDocReqAsComplete(@PathVariable String applicationId, @PathVariable String docRecTypeName) {
        System.out.println("KyCDocsRestService.markDocReqAsComplete");
        return kycDocsService.markDocReqAsComplete(applicationId, docRecTypeName);

    }

    @RequestMapping("/io/application/{applicationId}")
    public Application getApplication(@PathVariable String applicationId) {
        Application application = applicationDAO.findOne(applicationId);
        if (application == null) {
            throw new ResourceNotFoundException("No application found for applicationId: " + applicationId);
        }
        DocumentRequest dr = new DocumentRequest();
        return application;
    }

    @RequestMapping("/io/ping")
    public String ping() {
        return "ping";
    }

    @RequestMapping("/io/requestDoc")
    public Application requestDocs(@RequestParam("customerName") String customerName, @RequestParam("customerEmail") String customerEmail) throws SendGridException, IOException {
        return kycDocsService.requestDocs(customerName, customerEmail);
    }
//
//    @RequestMapping("/io/linkDoc/{id}")
//    public DocumentRequest linkDocument(@PathVariable String id, @RequestParam("url") String url) throws IOException, ChangeSetPersister.NotFoundException {
//        return kycDocsService.linkDocument(id, url);
//    }

    @RequestMapping("/io/init-doc-types/{reset}")
    public String initDocTypes(@PathVariable boolean reset) throws IOException {
        return kycDocsService.initDocTypes(reset);
    }
}
