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

    private final ResourceLoader resourceLoader;

    @Autowired
    private KycDocsService kycDocsService;

    @Autowired
    public KyCDocsRestService(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }

    @RequestMapping(method = RequestMethod.POST, value = "/io/upload/{applicationId}/{docRecTypeName}/")
    public DocumentRequest handleFileUpload(@PathVariable String applicationId, @PathVariable String docRecTypeName, @RequestParam("file") MultipartFile file,
                                   RedirectAttributes redirectAttributes) {

        try {
            System.out.println("KyCDocsRestService.handleFileUpload");
            return kycDocsService.uploadFile(applicationId, docRecTypeName, file, redirectAttributes);
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    @RequestMapping(method = RequestMethod.GET, value = "/io/markDocReqAsComplete/{applicationId}/{docRecTypeName}")
    public DocumentRequest markDocReqAsComplete(@PathVariable String applicationId, @PathVariable String docRecTypeName) {
        System.out.println("KyCDocsRestService.markDocReqAsComplete");
        return kycDocsService.markDocReqAsComplete(applicationId, docRecTypeName);

    }

    @RequestMapping("/io/application/{applicationId}")
    public Application getApplication(@PathVariable String applicationId) {
        System.out.println("KyCDocsRestService.getApplication");
        return kycDocsService.getApplication(applicationId);
    }

    @RequestMapping("/io/ping")
    public String ping() {
        System.out.println("KyCDocsRestService.ping");
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
