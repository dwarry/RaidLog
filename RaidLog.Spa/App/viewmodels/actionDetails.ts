/// <reference path="../../Scripts/typings/durandal/durandal.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />y
/// <reference path="../../Scripts/typings/knockout.validation/knockout.validation.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />

import ds = require('services/dataService');

var _actionStatuses: KnockoutObservableArray<ds.ActionStatusDto> = ko.observableArray();

ds.getReferenceData().done((refData: ds.ReferenceDataDto) => { _actionStatuses(refData.actionStatuses); });

var _parentItemTypes: string[] = ["Risk", "Assumption", "Issue", "Dependency", "Query"];

class ActionDetails {

    id: KnockoutObservable<number> = ko.observable();

    version = "";

    actionNumber: KnockoutObservable<number> = ko.observable();//.extend({min:0,max:99999});

    parentItemType: KnockoutObservable<string> = ko.observable();

    parentItemTypes = _parentItemTypes;

    parentItemId: KnockoutObservable<number> = ko.observable();

    parentItemNumber: KnockoutObservable<number> = ko.observable();

    parent: KnockoutComputed<string>;

    description: KnockoutObservable<string> = ko.observable().extend({ required: true, maxLength: 256 });

    actor: KnockoutObservable<string> = ko.observable().extend({ required: true, maxLength: 50 });

    actionStatusId: KnockoutObservable<number> = ko.observable().extend({ required: true });

    dueDate: KnockoutObservable<string> = ko.observable().extend({ required: true, dateISO: true });

    resolvedDate: KnockoutObservable<string> = ko.observable().extend({ required: true, dateISO: true });

    resolution: KnockoutObservable<string> = ko.observable().extend({ maxLength: 256 });

    validation: KnockoutValidatedObservable;

    canSave: KnockoutComputed<boolean>;

    status: KnockoutComputed<string>;

    actionStatuses = _actionStatuses;

    isNewItem: KnockoutComputed<boolean>;

    constructor(dto: ds.ActionDto,
                private _newItemCallback: (item: ActionDetails) => void) {

        this.validation = ko.validatedObservable([
            this.description,
            this.actor,
            this.actionStatusId,
            this.dueDate,
            this.resolvedDate,
            this.resolution
        ]);

        this.isNewItem = ko.computed(() => dto.id === 0);

                    this.parent = ko.computed(() => 
                        this.parentItemType().substring(0, 1) + "_" + this.parentItemNumber()
            , this);

        this.updateFromDto(dto);

        this.canSave = ko.computed(() => this.validation.isValid(), this);

        this.status = ko.computed(() => {
            var result = "(unknown)";
            var stsId = this.actionStatusId();

            $.each(this.actionStatuses(), (index, value) => {
                if (value.id === stsId) {
                    result = value.description;
                    return false;
                } else {
                    return true;
                }
            });

            return result;
        }, this);

    }

    updateFromDto(dto: ds.ActionDto) {
        this.id(dto.id);
        this.version = dto.version;
        this.actionNumber(dto.actionNumber);
        this.parentItemType(dto.parentItemType);
        this.parentItemId(dto.parentItemId);
        this.description(dto.description);
        this.actor(dto.actor);
        this.actionStatusId(dto.actionStatusId);
        this.dueDate((dto.dueDate || "").substring(0, 10));
        this.resolvedDate((dto.resolvedDate || "").substring(0, 10));
        this.resolution(dto.resolution);
    }

    save() {

        var dto: ds.MaintainActionDto;

        if (this.id() != 0) {
            var editDto: ds.EditActionDto = {
                id: this.id(),
                version: this.version,
                description: this.description(),
                actor: this.actor(),
                actionStatusId: this.actionStatusId(),
                dueDate: this.dueDate(),
                resolvedDate: this.resolvedDate(),
                resolution: this.resolution()
            };

            dto = editDto;
        } else {
            var newDto: ds.NewActionDto = {
                parentItemType: this.parentItemType(), 
                parentItemId: this.parentItemId(),
                description: this.description(),
                actor: this.actor(),
                actionStatusId: this.actionStatusId(),
                dueDate: this.dueDate()
            };

            dto = newDto;
        }

        ds.saveAction(dto).done(data => {
            this.updateFromDto(data);
            if (this.isNewItem() && this._newItemCallback) {
                this._newItemCallback(this);
            }
        });
    }

    showParent() {

    }
}


export = ActionDetails;