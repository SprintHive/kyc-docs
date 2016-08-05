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
var SingleDocUploadComponent = (function () {
    function SingleDocUploadComponent(applicationService, router) {
        this.applicationService = applicationService;
        this.router = router;
        this.refreshing = false;
        this.requesting = false;
        this.application = new model_1.Application;
        this.uploadProgress = 0;
        this.statusMessage = '';
        this.zone = new core_1.NgZone({ enableLongStackTrace: false });
    }
    SingleDocUploadComponent.prototype.ngOnInit = function () {
        console.log(this.documentRequest);
        this.options = {
            url: 'http://docs2.sprinthive.tech:8080/io/upload/' + this.application.id + '/' + this.documentRequest.documentType.name + '/'
        };
        this.setStatus();
    };
    SingleDocUploadComponent.prototype.setStatus = function () {
        if (this.documentRequest.fulfilled()) {
            if (this.documentRequest.scannedBarcode != null) {
                this.statusMessage = "Found: " + this.documentRequest.scannedBarcode;
            }
            else {
                if (this.documentRequest.documentType.barcodeScan) {
                    this.statusMessage = "No barcode found in image.";
                }
                else {
                    this.statusMessage = "Document uploaded.";
                }
            }
        }
        else {
            this.statusMessage = "Please provide your " + this.documentRequest.documentType.title;
        }
    };
    SingleDocUploadComponent.prototype.clearStatus = function () {
        this.uploadProgress = 0;
        this.uploadFile = null;
        this.setStatus();
        console.log('clearStatus2');
    };
    SingleDocUploadComponent.prototype.handleUpload = function (data) {
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
    __decorate([
        core_1.Input(), 
        __metadata('design:type', model_1.DocumentRequest)
    ], SingleDocUploadComponent.prototype, "documentRequest", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', model_1.Application)
    ], SingleDocUploadComponent.prototype, "application", void 0);
    SingleDocUploadComponent = __decorate([
        core_1.Component({
            selector: 'single-doc-upload',
            templateUrl: 'app/single-doc-upload.component.html',
            directives: [ng2_uploader_1.UPLOAD_DIRECTIVES],
        }), 
        __metadata('design:paramtypes', [application_service_1.ApplicationService, router_deprecated_1.Router])
    ], SingleDocUploadComponent);
    return SingleDocUploadComponent;
}());
exports.SingleDocUploadComponent = SingleDocUploadComponent;
//# sourceMappingURL=single-doc-upload.component.js.map