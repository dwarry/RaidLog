/// <reference path="../../Scripts/typings/durandal/durandal.d.ts" />
/// <reference path="../../Scripts/typings/knockout.validation/knockout.validation.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
/// <reference path="../services/logger.ts" />
/// <reference path="../services/dataService.ts" />
define(["require", "exports", "services/dataService", "plugins/dialog"], function(require, exports, __dataService__, __dialog__) {
    var dataService = __dataService__;

    var dialog = __dialog__;

    var MaintainProject = (function () {
        function MaintainProject(project) {
            this.projectId = 0;
            this.projectVersion = "";
            this.projectCode = ko.observable().extend({ required: true, minLength: 1, maxLength: 16 });
            this.projectName = ko.observable().extend({ required: true, minLength: 3, maxLength: 50 });
            this.title = "";
            this.validation = ko.validatedObservable({});
            if (project) {
                this.title = "Edit Project";
                this.projectId = project.id;
                this.projectVersion = project.version;
                this.projectCode(project.code);
                this.projectName(project.name);
            } else {
                this.title = "New Project";
                this.projectCode("");
                this.projectName("");
            }

            this.validation = ko.validatedObservable({ projectCode: this.projectCode, projectName: this.projectName });
        }
        MaintainProject.prototype.activate = function () {
            (this.validation).errors.showAllMessages();
        };

        MaintainProject.prototype.show = function () {
            return dialog.show(this, null);
        };

        MaintainProject.prototype.cancel = function () {
            dialog.close(this, false);
        };

        MaintainProject.prototype.save = function () {
            var _this = this;
            var proj = { code: this.projectCode(), name: this.projectName() };
            if (this.projectId !== 0) {
                proj.id = this.projectId;
                proj.version = this.projectVersion;
            }

            dataService.saveProject(proj).done(function () {
                return dialog.close(_this, true);
            }).fail(function () {
                return dialog.close(_this, false);
            });
        };
        return MaintainProject;
    })();

    
    return MaintainProject;
});
