package za.co.leroux.kyc.docs.dao;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.io.IOException;

import za.co.leroux.kyc.docs.model.DocumentType;

/**
 * Created by Dirk le Roux on 2016/05/18.
 */
public interface DocumentTypeDAO extends MongoRepository<DocumentType, String> {

    DocumentType findByName(String name) throws IOException;
}
