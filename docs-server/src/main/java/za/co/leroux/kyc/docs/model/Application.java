package za.co.leroux.kyc.docs.model;

import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import za.co.leroux.kyc.docs.exception.ResourceNotFoundException;

/**
 * Created by Dirk le Roux on 2016/05/18.
 */
public class Application {

    @Id
    private String id;
    private String customerName;
    private String customerEmail;
    private String cusomerIdNumber;
    private ArrayList<DocumentRequest> documentRequests = new ArrayList<>(3);

    public String getId() {
        return id;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }

    public String getCusomerIdNumber() {
        return cusomerIdNumber;
    }

    public void setCusomerIdNumber(String cusomerIdNumber) {
        this.cusomerIdNumber = cusomerIdNumber;
    }

    public List<DocumentRequest> getDocumentRequests() {
        return Collections.unmodifiableList(documentRequests);
    }

    public void addDocumentRequest(DocumentRequest documentRequest) {
//        if(!documentRequests.contains(documentRequest)){
            documentRequests.add(documentRequest);
//        }
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Application)) return false;

        Application that = (Application) o;

        return id != null ? id.equals(that.id) : that.id == null;

    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }

    public DocumentRequest findByName(String docRecTypeName) {
        for (DocumentRequest documentRequest : documentRequests) {
            if(documentRequest.getDocumentType().getName().equals(docRecTypeName)){
                return documentRequest;
            }
        }
        throw new ResourceNotFoundException("No DocumentRequest with name:'"+docRecTypeName+"' found on appliction:'"+id+"'");
    }
}
