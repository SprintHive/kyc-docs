package za.co.leroux.kyc.docs.dao;

import org.springframework.data.mongodb.repository.MongoRepository;

import za.co.leroux.kyc.docs.model.Application;

/**
 * Created by Dirk le Roux on 2016/05/18.
 */
public interface ApplicationDAO extends MongoRepository<Application, String> {

}
