/// <reference path="../../Scripts/typings/durandal/durandal.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/knockout.validation/knockout.validation.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />

import dlg = require('plugins/dialog');
import router = require('plugins/router');
import ds = require("services/dataService");
import rf = require('services/routeFactory');
import ActionDetailsDialog = require('./actionDetailsDialog');


var _ragStatuses = ["Green", "Amber", "Red"];

var _dependencyStatuses = ["Outstanding", "In Progress", "Fulfilled"];

class DependencyDetail{

    id: KnockoutObservable<number> = ko.observable();

    version: string = null;

    dependencyNumber: KnockoutObservable<number> = ko.observable();

    status: KnockoutObservable<string> = ko.observable().extend({ required: true, maxLength: 16 });

    statuses = _dependencyStatuses; 

    workstream: KnockoutObservable<string> = ko.observable().extend({ required: true, maxLength: 50 });

    description: KnockoutObservable<string> = ko.observable().extend({ required: true, maxLength: 2048 });

    plannedDate: KnockoutObservable<string> = ko.observable().extend({ required: true, dateISO: true });

    requiredByDate: KnockoutObservable<string> = ko.observable().extend({ required: true, dateISO: true });

    comments: KnockoutObservable<string> = ko.observable().extend({ maxLength: 2048 });

    ragStatus: KnockoutObservable<string> = ko.observable().extend({ required: true });

    ragStatuses = _ragStatuses;

    ragClass: KnockoutComputed<string> = ko.computed(() => "rag" + this.ragStatus(), this);

    dependencyLevel: KnockoutObservable<string> = ko.observable().extend({ required: true, maxLength: 50 });

    validation: KnockoutValidatedObservable;

    canSave : KnockoutComputed<boolean> = ko.computed(() => this.validation.isValid(), this);

    isNew: KnockoutComputed<boolean> = ko.computed(() => !this.id(), this);

    constructor(private projectId: number,
        dto: ds.DependencyDto,
        private _newItemCallback: (dep: DependencyDetail) => void) {

            this.validation = ko.validatedObservable([
                this.status,
                this.workstream,
                this.description,
                this.plannedDate,
                this.requiredByDate,
                this.comments,
                this.ragStatus,
                this.dependencyLevel

            ]);

            this.updateFromDto(dto);
    }

    updateFromDto(dto: ds.DependencyDto) {
        this.id(dto.id);
        this.version = dto.version;
        this.projectId = dto.projectId;
        this.dependencyNumber(dto.dependencyNumber);
        this.status(dto.status);
        this.workstream(dto.workstream);
        this.description(dto.description);
        this.plannedDate((dto.plannedDate || "").substring(0, 10));
        this.requiredByDate((dto.requiredByDate || "").substring(0, 10));
        this.comments(dto.comments);
        this.ragStatus(dto.ragStatus);
        this.dependencyLevel(dto.dependencyLevel);
    }

    save() {
        var dto: ds.MaintainDependencyDto;
        dto = {
            status: this.status(),
            workstream:this.workstream(),
            description: this.description(),
            plannedDate: this.plannedDate(),
            requiredByDate: this.requiredByDate(),
            comments: this.comments(),
            ragStatus: this.ragStatus(),
            dependencyLevel: this.dependencyLevel()
        };

        if (this.isNew()) {
            var newItem = <ds.NewDependencyDto>dto;
            newItem.projectId = this.projectId;
        } else {
            var editItem = <ds.EditDependencyDto>dto;
            editItem.id = this.id();
            editItem.version = this.version;
        }

        ds.saveDependency(dto).done((data) => {
            this.updateFromDto(data);
            if (newItem) {
                this._newItemCallback(this);
            }
        });;
    }

    addAction() {
        var action = ds.makeActionDto();
        action.parentItemType = "Dependency";
        action.parentItemId = this.id();

        var ad = new ActionDetailsDialog(action);

        dlg.show(ad);
    }

    showActions() {
        var route = rf.makeItemActionLink('dependency', this.id());

        router.navigate(route);
    }
}

export = DependencyDetail;