package za.co.leroux.kyc.docs.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by Dirk le Roux on 2016/05/18.
 */
public class DocumentRequest {

    private String id;
    private DocumentType documentType;
    private ArrayList<String> documents = new ArrayList<String>();
    private DocumentRequestStatus status = DocumentRequestStatus.NEW;
    private String scannedBarcode;
    private String expectedBarcode;

    public DocumentRequest() {
    }

    public String getId() {
        return id;
    }

    public DocumentType getDocumentType() {
        return documentType;
    }

    public void setDocumentType(DocumentType documentType) {
        this.documentType = documentType;
    }

    public List<String> getDocuments() {
        return Collections.unmodifiableList(documents);
    }

    public void addDocument(String document) {
        if(!documents.contains(document)){
            documents.add(document);
        }
    }

    public void clearDocuments() {
        documents.clear();
    }

    public DocumentRequestStatus getStatus() {
        return status;
    }

    public void setStatus(DocumentRequestStatus status) {
        this.status = status;
    }

    public String getScannedBarcode() {
        return scannedBarcode;
    }

    public void setScannedBarcode(String scannedBarcode) {
        this.scannedBarcode = scannedBarcode;
    }

    public String getExpectedBarcode() {
        return expectedBarcode;
    }

    public void setExpectedBarcode(String expectedBarcode) {
        this.expectedBarcode = expectedBarcode;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof DocumentRequest)) return false;

        DocumentRequest that = (DocumentRequest) o;

        return id != null ? id.equals(that.id) : that.id == null;

    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }
}
