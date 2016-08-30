package za.co.leroux.kyc.docs.service;

import com.aspose.barcode.barcoderecognition.BarCodeReadType;
import com.aspose.barcode.barcoderecognition.BarCodeReader;
import com.aspose.barcode.internal.Exceptions.Exception;
import com.sendgrid.SendGrid;
import com.sendgrid.SendGridException;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

import za.co.leroux.kyc.docs.dao.ApplicationDAO;
import za.co.leroux.kyc.docs.dao.DocumentTypeDAO;
import za.co.leroux.kyc.docs.exception.ResourceNotFoundException;
import za.co.leroux.kyc.docs.model.Application;
import za.co.leroux.kyc.docs.model.DocumentRequest;
import za.co.leroux.kyc.docs.model.DocumentRequestStatus;
import za.co.leroux.kyc.docs.model.DocumentType;

/**
 * Created by Dirk le Roux on 2016/05/17.
 */
@Service
public class KycDocsService {

    private static final String DOCUMENT_TYPE_ID = "id-document";
    private static final String DOCUMENT_TYPE_PROOF_OF_ADRESS = "proof-of-adress";
    private static final String DOCUMENT_TYPE_BANK_STATEMENTS = "bank-statements";
    public static final String ROOT = "upload-dir";

    @Autowired
    private ApplicationDAO applicationDAO;
    @Autowired
    private DocumentTypeDAO documentTypeDAO;


    public Application getApplication(String applicationId) {
        Application application = applicationDAO.findOne(applicationId);
        if (application == null) {
            throw new ResourceNotFoundException("No application found for applicationId: " + applicationId);
        }
        return application;
    }

    public DocumentRequest uploadFile(String applicationId, String docRecTypeName, MultipartFile file, RedirectAttributes redirectAttributes) {
        if (!file.isEmpty()) {
            try {
                String filename = file.getOriginalFilename();
                System.out.println("filename = " + filename);
                String extension = FilenameUtils.getExtension(filename);
                System.out.println("extension = " + extension);
                Application application = applicationDAO.findOne(applicationId);
                if (application == null) {
                    throw new ResourceNotFoundException("No appliction found for is: " + applicationId);
                }
                DocumentRequest dr = application.findByName(docRecTypeName);
                if (dr == null) {
                    throw new ResourceNotFoundException("No document request found for name: " + docRecTypeName + " no appliction:" + applicationId);
                }
                String fileName = applicationId + '-' + docRecTypeName + '-' + dr.getDocuments().size()+'.'+extension;
                if (dr.getDocumentType().isSinglePage()) {
                    dr.clearDocuments();
                    dr.addDocument(fileName);
                    dr.setStatus(DocumentRequestStatus.COMPLETE);
                } else {
                    dr.addDocument(fileName);
                    dr.setStatus(DocumentRequestStatus.BUSY);
                }
                applicationDAO.save(application);
                redirectAttributes.addFlashAttribute("fileName", fileName);
                Path target = Paths.get(ROOT, fileName);
                System.out.println("target = " + target);
                Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);
                String message = "You successfully uploaded " + file.getOriginalFilename() + "!";
                redirectAttributes.addFlashAttribute("message",
                        message);
                dr = scanForBarcode(application, dr, fileName);

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

    public DocumentRequest markDocReqAsComplete(String applicationId, String docRecTypeName) {
        Application application = applicationDAO.findOne(applicationId);
        System.out.println("application = " + application);
        if (application == null) {
            throw new ResourceNotFoundException("No appliction found for is: " + applicationId);
        }
        DocumentRequest dr = application.findByName(docRecTypeName);
        System.out.println("dr = " + dr);
        if (dr == null) {
            throw new ResourceNotFoundException("No document request found for name: " + docRecTypeName + " no appliction:" + applicationId);
        }
        dr.setStatus(DocumentRequestStatus.COMPLETE);
        application = applicationDAO.save(application);
        return dr;
    }

    public Application requestDocs(String customerName, String customerEmail) throws SendGridException, IOException, SendGridException {
        Application application = new Application();
        application.setCustomerEmail(customerEmail);
        application.setCustomerName(customerName);

        List<DocumentType> documentTypes = documentTypeDAO.findAll();
        for (DocumentType documentType : documentTypes) {
            addDocumentRequestToApplication(application, documentType);
        }


        application = applicationDAO.save(application);

        //TODO This will need to move to an Async Task
        SendGrid sendgrid = new SendGrid("");
        SendGrid.Email email = new SendGrid.Email();
        email.addTo(customerEmail);
        email.setFrom("dirk.leroux@sprinthive.com");
        email.setSubject("Document Request");
        email.setHtml("Please follow <a href=\"http://docs2.sprinthive.tech/upload-list/" + application.getId() + "\"> this link </a> to provide your ID document.");
        SendGrid.Response response = sendgrid.send(email);
        return application;
    }

    private DocumentRequest addDocumentRequestToApplication(Application application, DocumentType documentType) throws IOException {
        DocumentRequest dr = null;
        if (documentType != null) {
            dr = new DocumentRequest();
            dr.setDocumentType(documentType);
            dr.setDocumentType(documentType);
            application.addDocumentRequest(dr);
        }
        return dr;
    }

    private DocumentRequest scanForBarcode(Application application, DocumentRequest dr, String imageUrl) {
        if (dr.getDocumentType().isBarcodeScan()) {
            BarCodeReader r = null;
            try {
                //Instantiate a BarCodeReader
                r = new BarCodeReader("upload-dir/" + imageUrl, BarCodeReadType.Code39Standard);

                //Scan the image for target barcode(s)
                if (r.read()) {
                    //barcode found.
                    System.out.println("CodeText: " + r.getCodeText());
                    String idnum = r.getCodeText();
                    System.out.println("idnum = " + idnum);
                    dr.setScannedBarcode(idnum);
                    dr.setStatus(DocumentRequestStatus.COMPLETE);
                    application = applicationDAO.save(application);
                } else {
                    System.out.println("No Barcode found.");
                    //barcode not found.
                    dr.setScannedBarcode(null);
                    dr.setStatus(DocumentRequestStatus.BUSY);
                    application = applicationDAO.save(application);
                }
            } catch (Exception e) {
                dr.setScannedBarcode(null);
                dr.setStatus(DocumentRequestStatus.BUSY);
                application = applicationDAO.save(application);
                e.printStackTrace();
            } finally {
                try {
                    if (r != null) {
                        r.close();
                    }
                } catch (Exception x) {/*Do Nothing*/}
            }
        }
        return application.findByName(dr.getDocumentType().getName());
    }

    public String initDocTypes(boolean reset) throws IOException {
        if (reset) {
            System.out.println("reset = " + reset);
            documentTypeDAO.deleteAll();
        }
        StringBuilder sb = new StringBuilder("Found types: ");
        documentType(DOCUMENT_TYPE_ID, "ID Document", true, true, "ID number", "glyphicon-user", sb);
        documentType(DOCUMENT_TYPE_PROOF_OF_ADRESS, "Proof of Address", true, false, null, "glyphicon-home", sb);
        documentType(DOCUMENT_TYPE_BANK_STATEMENTS+"-may", "May Banks Statements", false, false, null, "glyphicon-usd", sb);
        documentType(DOCUMENT_TYPE_BANK_STATEMENTS+"-june", "June Banks Statements", false, false, null, "glyphicon-usd", sb);
        documentType(DOCUMENT_TYPE_BANK_STATEMENTS+"-july", "July Banks Statements", false, false, null, "glyphicon-usd", sb);
        return sb.toString();
    }

    private DocumentType documentType(String name, String title, boolean isSinglePage, boolean isBarcodeScan, String barcodeLabel, String glyphicon, StringBuilder sb) throws IOException {
        DocumentType documentType = documentTypeDAO.findByName(name);
        if (documentType == null) {
            documentType = new DocumentType();
            documentType.setName(name);
            documentType.setBarcodeScan(isBarcodeScan);
            documentType.setBarcodeLabel(barcodeLabel);
            documentType.setSinglePage(isSinglePage);
            documentType.setTitle(title);
            documentType.setGlyphicon(glyphicon);
            documentType = documentTypeDAO.save(documentType);
        }
        System.out.println("dt = " + documentType);
        sb.append(documentType.getId());
        sb.append(":");
        sb.append(documentType.getName());
        sb.append(" ");
        return documentType;
    }

}
