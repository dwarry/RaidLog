/// <reference path="../../Scripts/typings/durandal/durandal.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/knockout.validation/knockout.validation.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />

import dlg = require('plugins/dialog');
import router = require('plugins/router');
import ds = require("services/dataService");
import rf = require('services/routeFactory');
import ActionDetailsDialog = require('./actionDetailsDialog');

var _urgencies = ["Low", "Medium", "High", "Very High"];

class QueryDetails {

    id: KnockoutObservable<number> = ko.observable();

    version: string = null;

    queryNumber: KnockoutObservable<number> = ko.observable();

    workstream: KnockoutObservable<string> = ko.observable().extend({ required: true, maxLength: 50 });

    deliverableImpacted: KnockoutObservable<string> = ko.observable().extend({ required: true, maxLength: 50 });

    urgency: KnockoutObservable<string> = ko.observable().extend({ required: true, maxLength: 10 });

    urgencies = _urgencies;

    description: KnockoutObservable<string> = ko.observable().extend({ required: true, maxLength: 2048 });

    raisedBy: KnockoutObservable<string> = ko.observable().extend({ required: true, maxLength: 50 });

    raisedTo: KnockoutObservable<string> = ko.observable().extend({ required: true, maxLength: 50 });

    raisedDate: KnockoutObservable<string> = ko.observable().extend({ required: true, dateISO: true });

    requiredByDate: KnockoutObservable<string> = ko.observable().extend({ required: true, dateISO: true });

    answer: KnockoutObservable<string> = ko.observable().extend({ maxLength: 1024 });

    answeredBy: KnockoutObservable<string> = ko.observable().extend({ required: { onlyIf: ()=>(this.answer() !== null && this.answer() !== "")}, maxLength: 50 });

    answeredDate: KnockoutObservable<string> = ko.observable().extend({ dateISO: true, required: { onlyIf: () => (this.answer() !== null && this.answer() !== "") } });

    confirmedInDocuments: KnockoutObservable<string> = ko.observable().extend({ required: true, maxLength: 256 });

    validation: KnockoutValidatedObservable;

    canSave: KnockoutComputed<boolean> = ko.computed(() => this.validation.isValid(), this);

    isNew: KnockoutComputed<boolean> = ko.computed(() => !this.id(), this);

    constructor(private projectId: number,
        dto: ds.QueryDto,
        private _newItemCallback: (dep: QueryDetails) => void) {

        this.validation = ko.validatedObservable([
            this.workstream,
            this.deliverableImpacted,
            this.urgency,
            this.description,
            this.raisedBy,
            this.raisedTo,
            this.raisedDate,
            this.requiredByDate,
            this.answer,
            this.answeredBy,
            this.answeredDate,
            this.confirmedInDocuments
        ]);

        this.updateFromDto(dto);
    }

    updateFromDto(dto: ds.QueryDto) {
        this.id(dto.id);
        this.version = dto.version;
        this.projectId = dto.projectId;
        this.queryNumber(dto.queryNumber);
        this.workstream(dto.workstream);
        this.deliverableImpacted(dto.deliverableImpacted);
        this.urgency(dto.urgency);
        this.description(dto.description);
        this.raisedBy(dto.raisedBy);
        this.raisedTo(dto.raisedTo);
        this.raisedDate((dto.raisedDate || "").substring(0, 10));
        this.answer(dto.answer);
        this.answeredBy(dto.answeredBy);
        this.answeredDate((dto.answeredDate || "").substring(0, 10));
        this.confirmedInDocuments(dto.confirmedInDocuments);
    }

    save() {
        var dto: ds.MaintainQueryDto;
        dto = {
            workstream: this.workstream(),
            deliverableImpacted: this.deliverableImpacted(),
            urgency: this.urgency(),
            description: this.description(),
            
            
        };

        if (this.isNew()) {
            var newItem = <ds.NewQueryDto>dto;
            newItem.projectId = this.projectId;
            newItem.raisedBy = this.raisedBy();
            newItem.raisedTo = this.raisedTo();
            newItem.raisedDate = this.raisedDate();
        } else {
            var editItem = <ds.EditQueryDto>dto;
            editItem.id = this.id();
            editItem.version = this.version;
            editItem.answer = this.answer();
            editItem.answeredBy = this.answeredBy();
            editItem.answeredDate = this.answeredDate();
            editItem.confirmedInDocuments = this.confirmedInDocuments();
            
        }

        ds.saveQuery(dto).done((data) => {
            this.updateFromDto(data);
            if (newItem) {
                this._newItemCallback(this);
            }
        });;
    }

    addAction() {
        var action = ds.makeActionDto();
        action.parentItemType = "Query";
        action.parentItemId = this.id();

        var ad = new ActionDetailsDialog(action);

        dlg.show(ad);
    }

    showActions() {
        var route = rf.makeItemActionLink('query', this.id());

        router.navigate(route);
    }
}

export = QueryDetails;