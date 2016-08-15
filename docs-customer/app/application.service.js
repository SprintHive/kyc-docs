"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var Rx_1 = require('rxjs/Rx');
var http_1 = require('@angular/http');
var ApplicationService = (function () {
    function ApplicationService(http) {
        this.http = http;
        this.getApplicationUrl = 'http://192.168.1.117:8080/io/application/'; // URL to web API
        this.markDocReqAsCompleteUrl = 'http://192.168.1.117:8080/io/markDocReqAsComplete/'; // URL to web API
    }
    ApplicationService.prototype.getApplication = function (applicationId) {
        var url = this.getApplicationUrl + applicationId;
        console.log(url);
        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ApplicationService.prototype.extractData = function (res) {
        var body = res.json();
        return body;
    };
    ApplicationService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Rx_1.Observable.throw(errMsg);
    };
    ApplicationService.prototype.markAsDone = function (application, docRecTypeName) {
        var id = application.id;
        var url = this.markDocReqAsCompleteUrl + id + "/" + docRecTypeName;
        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ApplicationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ApplicationService);
    return ApplicationService;
}());
exports.ApplicationService = ApplicationService;
//# sourceMappingURL=application.service.js.map