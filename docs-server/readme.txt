

Building and running the project
================================
Run to project with the following command:
mvn spring-boot:run
Maven should download all the required dependencies and start a webserver.
Apart from having a working maven install, no other software should be needed to run the restful web server.

Notes
=====
I used Jest since AWS Hosted ElasticSearch does not support TCP transport. The lack of native TCP transport meant that I couldn't use the Elasticsearch native client or Spring Data Elasticsearch. "The service supports HTTP on port 80, but does not support TCP transport." from: http://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/aes-limits.html

For simplicity and speed of dev (and ease of validation) I did not abstract any layers with a messaging solution. The rest service calls the logic service directly which in turn calls the DAO directly.

I kept as many of the rest calls as I could as ‘get’s and tried to avoid the other verbs (like post) to make evaluation of the app easier. On a real production service I would have used post to comply more strictly with rest.


Security
========
No security was implemented at all.

Automated Testing
=================
Automated testing were required and not provided.

Project structure
=================
za.co.leroux.mrdyou.dao
	This package contains the data access layer.
za.co.leroux.mrdyou.exception
	This package contains the exceptions use to indicate error states between layers. Jest does not have a effective exception hierarchy
 za.co.leroux.mrdyou.model
	The storage and transport object model. I had a separate DTO package, but I removed it in the end because it was identical to the storage model. If the requirements diverge we should split the packages again.
za.co.leroux.mrdyou.rest
	The rest service. This service exposes the business logic as a restful json api.
za.co.leroux.mrdyou.service
	The business logic service.

Useful URLs
============
http://localhost:8080/car
    Lists off the cars in the systems.
http://localhost:8080/car/findnear?lat=[lat]&lon=[lon]
    Lists closest 10 cars that are in an idle state; ordered from closest to furtherest
http://localhost:8080/car/[carId]
    Reads the car data with the provided id
http://localhost:8080/car/requestLift?carId=[carId]&cust_name=[name]&pick_up_lat=[pickupLat]&pick_up_lon=[pickupLon]&drop_off_lat=[dropoffLat]&drop_off_lon=[dropoffLon]
    Resquests a Lift from the car with [carId] from the pickup location to the dropp off location for [name]
http://localhost:8080/car/acceptRequest/AVTQGY6kWqPEh0imCBIA
    Accepts the request for a lift and updates the car status
http://localhost:8080/car/pickUpCustomer/AVTQGY6kWqPEh0imCBIA
    Accepts the request for a lift, changes the car location and updates the car status
http://localhost:8080/car/dropOffCustomer/AVTQGY6kWqPEh0imCBIA
    Accepts the request for a lift, changes the car location and updates the car status

