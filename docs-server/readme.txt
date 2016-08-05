

Building and running the project
================================
Run to project with the following command:
mvn spring-boot:run
Maven should download all the required dependencies and start a webserver.
Apart from having a working maven install, no other software should be needed to run the restful web server.

Notes
=====


Security
========
No security was implemented at all.

Automated Testing
=================

Project structure
=================

Useful URLs
============
http://localhost:8080/io/requestDoc?customerName=[Name]&customerEmail=[e-mail]
    Create a default request for docs.
http://localhost:8080/io/markDocReqAsComplete/[app_id]/[doc__req_type_name]
    Marks the doc request as complete
