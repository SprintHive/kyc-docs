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
var core_1 = require("@angular/core");
var model_1 = require("./model");
var application_service_1 = require("./application.service");
var router_deprecated_1 = require("@angular/router-deprecated");
var ng2_uploader_1 = require("ng2-uploader/ng2-uploader");
var http_1 = require('@angular/http');
var MultiDocUploadComponent = (function () {
    function MultiDocUploadComponent(applicationService, router, http) {
        this.applicationService = applicationService;
        this.router = router;
        this.http = http;
        this.refreshing = false;
        this.requesting = false;
        this.application = new model_1.Application;
        this.uploadProgress = 0;
        this.statusMessage = '';
        this.zone = new core_1.NgZone({ enableLongStackTrace: false });
    }
    MultiDocUploadComponent.prototype.ngOnInit = function () {
        console.log(this.documentRequest);
        this.options = {
            url: 'http://docs2.sprinthive.tech:8080/io/upload/' + this.application.id + '/' + this.documentRequest.documentType.name + '/'
        };
        this.setStatus();
    };
    MultiDocUploadComponent.prototype.setStatus = function () {
        this.statusMessage = this.documentRequest.documents.length + " documents uploaded.";
    };
    MultiDocUploadComponent.prototype.clearStatus = function () {
        this.uploadProgress = 0;
        this.uploadFile = null;
        this.setStatus();
        console.log('clearStatus2');
    };
    MultiDocUploadComponent.prototype.handleUpload = function (data) {
        var _this = this;
        this.uploadFile = data;
        console.log(this.uploadFile);
        this.zone.run(function () {
            _this.uploadProgress = data.progress.percent;
            console.log('uploadProgress:' + _this.uploadProgress);
        });
        console.log('data');
        console.log(data);
        if (data.status == 200) {
            console.log('in if');
            var documentRequest = JSON.parse(data.response);
            documentRequest.fulfilled = this.documentRequest.fulfilled;
            documentRequest.started = this.documentRequest.started;
            this.documentRequest = documentRequest;
            this.statusMessage = "Upload complete.";
            this.clearStatus();
        }
    };
    MultiDocUploadComponent.prototype.markAsDone = function (docRecTypeName) {
        var _this = this;
        var id = this.application.id;
        return this.applicationService.markAsDone(this.application, docRecTypeName)
            .subscribe(function (documentRequest) { return _this.receiveDocumentRequest(documentRequest); }, function (error) { return _this.handleError(error); });
        //
        // console.log('linkDoc');
        // var id = this.application.id;
        // console.log('linkDoc id: ' + id );
        // var url = 'http://docs2.sprinthive.tech:8080/io/markDocReqAsComplete/' + id+"/"+docRecTypeName;
        // var xhttp = new XMLHttpRequest();
        // xhttp.onreadystatechange = function () {
        //     if (xhttp.readyState == 4 && xhttp.status == 200) {
        //         // var text = xhttp.responseText;
        //         // console.log('Request responseText: ' + text);
        //         // let documentRequest = JSON.parse(text);
        //         // documentRequest.fulfilled = this.documentRequest.fulfilled;
        //         // documentRequest.started = this.documentRequest.started;
        //         // this.documentRequest = documentRequest;
        //         location.reload();
        //         // this.clearStatus();
        //     }
        // };
        // xhttp.open("GET", url, true);
        // xhttp.send();
    };
    MultiDocUploadComponent.prototype.receiveDocumentRequest = function (documentRequest) {
        console.log('receiveDocumentRequest');
        console.log(documentRequest);
        documentRequest.fulfilled = this.documentRequest.fulfilled;
        documentRequest.started = this.documentRequest.started;
        this.documentRequest = documentRequest;
        // location.reload();
        return documentRequest;
    };
    MultiDocUploadComponent.prototype.handleError = function (error) {
        this.statusMessage = error;
    };
    MultiDocUploadComponent.prototype.showDone = function () {
        return this.documentRequest.status !== "COMPLETE";
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', model_1.DocumentRequest)
    ], MultiDocUploadComponent.prototype, "documentRequest", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', model_1.Application)
    ], MultiDocUploadComponent.prototype, "application", void 0);
    MultiDocUploadComponent = __decorate([
        core_1.Component({
            selector: 'multi-doc-upload',
            templateUrl: 'app/multi-doc-upload.component.html',
            directives: [ng2_uploader_1.UPLOAD_DIRECTIVES],
        }), 
        __metadata('design:paramtypes', [application_service_1.ApplicationService, router_deprecated_1.Router, http_1.Http])
    ], MultiDocUploadComponent);
    return MultiDocUploadComponent;
}());
exports.MultiDocUploadComponent = MultiDocUploadComponent;
//# sourceMappingURL=multi-doc-upload.component.js.map