package za.co.leroux.kyc.docs.dao;

import org.springframework.data.mongodb.repository.MongoRepository;

import za.co.leroux.kyc.docs.model.DocumentRequest;

/**
 * Created by Dirk le Roux on 2016/05/18.
 */
public interface DocumentRequestDAO extends MongoRepository<DocumentRequest, String> {

}
