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
///<reference path="model.ts"/>
var core_1 = require("@angular/core");
var model_1 = require("./model");
var application_service_1 = require("./application.service");
var router_deprecated_1 = require("@angular/router-deprecated");
var upload_selector_component_1 = require('./upload-selector.component');
var router_deprecated_2 = require('@angular/router-deprecated');
var UploadListComponent = (function () {
    function UploadListComponent(applicationService, router, routeParams) {
        this.applicationService = applicationService;
        this.router = router;
        this.routeParams = routeParams;
        this.refreshing = false;
        this.requesting = false;
        this.mainMessage = 'Loading your application status';
    }
    UploadListComponent.prototype.ngOnInit = function () {
        this.getApplication();
    };
    UploadListComponent.prototype.getApplication = function () {
        var _this = this;
        var id = this.routeParams.get('applicationId');
        if (id !== null) {
            this.requesting = true;
            this.applicationService.getApplication(id)
                .subscribe(function (application) { return _this.newStateReceived(application); }, function (error) { return _this.handleError(error); });
        }
    };
    UploadListComponent.prototype.newStateReceived = function (application) {
        this.application = application;
        console.log(application);
        this.requesting = false;
        var noCompleted = 0;
        var length = this.application.documentRequests == null ? 0 : this.application.documentRequests.length;
        var dr = new model_1.DocumentRequest();
        for (var i = 0, l = length; i < l; i++) {
            application.documentRequests[i].fulfilled = dr.fulfilled;
            application.documentRequests[i].started = dr.started;
            console.log(this.application.documentRequests[i]);
            if (this.application.documentRequests[i].fulfilled()) {
                noCompleted++;
            }
        }
        var name = this.application.customerName;
        this.mainMessage = 'Hi ' + name + ', you have provided ' + noCompleted + ' of ' + length + ' documents.';
        this.secondaryMessage = 'You can take a picture or upload a file.';
    };
    UploadListComponent.prototype.handleError = function (error) {
        this.mainMessage = 'Problems loading your application status';
        this.errorMessage = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        this.requesting = false;
    };
    UploadListComponent.prototype.getButtonStyle = function (docReq) {
        if (docReq.fulfilled()) {
            return 'panel-success';
        }
        else if (docReq.started()) {
            return 'panel-warning';
        }
        else {
            return 'panel-primary';
        }
    };
    UploadListComponent.prototype.getGlyphicon = function (docReq) {
        if (docReq.fulfilled()) {
            return 'glyphicon-ok';
        }
        else if (docReq.started()) {
            return 'glyphicon-floppy-disk';
        }
        else {
            return 'glyphicon-cloud-upload';
        }
    };
    UploadListComponent = __decorate([
        core_1.Component({
            selector: 'upload-list',
            templateUrl: 'app/upload-list.component.html',
            directives: [upload_selector_component_1.UploadSelectorComponent]
        }), 
        __metadata('design:paramtypes', [application_service_1.ApplicationService, router_deprecated_1.Router, router_deprecated_2.RouteParams])
    ], UploadListComponent);
    return UploadListComponent;
}());
exports.UploadListComponent = UploadListComponent;
//# sourceMappingURL=upload-list.component.js.map