/// <reference path="../../Scripts/typings/durandal/durandal.d.ts" />
/// <reference path="../../Scripts/typings/knockout.validation/knockout.validation.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
/// <reference path="../services/logger.ts" />
/// <reference path="../services/dataService.ts" />

import dataService = require("services/dataService");

import dialog = require("plugins/dialog");

class MaintainProject {

    projectId = 0;
    projectVersion = "";
    projectCode = ko.observable().extend({ required: true, minLength: 1, maxLength: 16 });
    projectName = ko.observable().extend({ required: true, minLength: 3, maxLength: 50 });
    title = "";
    validation = ko.validatedObservable({});

    constructor(project?: dataService.Project) {
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

    activate() {
        (<any>this.validation).errors.showAllMessages();
    }

    show(): JQueryPromise<boolean> {
        return dialog.show(this, null);
    }

    cancel() {
        dialog.close(this,false);   
    }

    save() {
        var proj: any = { code: this.projectCode(), name: this.projectName() };
        if (this.projectId !== 0) {
            proj.id = this.projectId;
            proj.version = this.projectVersion;
        }

        dataService.saveProject(proj)
            .done(() => dialog.close(this, true))
            .fail(() => dialog.close(this, false));
    
    }
}

export = MaintainProject;