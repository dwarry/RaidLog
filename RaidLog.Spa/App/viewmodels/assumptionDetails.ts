/// <reference path="../../Scripts/typings/durandal/durandal.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />y
/// <reference path="../../Scripts/typings/knockout.validation/knockout.validation.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />

import ds = require('services/dataService');

var _assumptionStatuses: KnockoutObservableArray< ds.AssumptionStatusDto> = ko.observableArray();

ds.getReferenceData().done( (refData:ds.ReferenceDataDto) => { _assumptionStatuses(refData.assumptionStatuses); });

class AssumptionDetails{

    id = 0;

    version = "";

    assumptionNumber: KnockoutObservable<number> = ko.observable();//.extend({min:0,max:99999});

    description: KnockoutObservable<string> = ko.observable("").extend({ required: true, maxLength: 2048 });

    workstream: KnockoutObservable<string> = ko.observable("").extend({ require: true, maxLength: 50 });

    owner: KnockoutObservable<string> = ko.observable("").extend({ maxLength: 50 });

    validatedBy: KnockoutObservable<string> = ko.observable("").extend({ maxLength: 50 });

    statusId: KnockoutObservable<number> = ko.observable(<number>null).extend({ required: true });

    supportingDocumentation: KnockoutObservable<string> = ko.observable("").extend({
        maxLength: 512
    });

    validation: KnockoutValidatedObservable;

    canSave: KnockoutComputed<boolean>;

    status: KnockoutComputed<string>;

    assumptionStatuses = _assumptionStatuses;

    constructor(private projectId: number,
        dto: ds.AssumptionDto,
        private _newItemCallback: (item: AssumptionDetails) => void) {
        this.validation = ko.validatedObservable([
            this.description,
            this.workstream,
            this.owner,
            this.validatedBy,
            this.statusId,
            this.supportingDocumentation
        ]);


        this.updateFromDto(dto);
        
        this.canSave = ko.computed(() => this.validation.isValid(), this);

        this.status = ko.computed(() => {
            var result = "(unknown)";
            var stsId = this.statusId();

            $.each(this.assumptionStatuses(), (index, value) => {
                if (value.id === stsId) {
                    result = value.description;
                    return false;
                } else {
                    return true;
                }
            });

            return result;
        }, this);

        this.validatedBy.extend({
            required: { onlyIf: () => this._isCurrentStatusFinal() }
        });
        
        this.supportingDocumentation.extend({
            required: {onlyIf: () => this._isCurrentStatusFinal()}
        });
    }

    private _isCurrentStatusFinal(): boolean {
        var result = false;
        var stsId = this.statusId(); 

        $.each(this.assumptionStatuses(), (index, value) => {
            if (value.id === stsId) {
                result = value.isFinalState;
                return false;
            } else {
                return true;
            }
        });

        return result;
    }

    updateFromDto(dto: ds.AssumptionDto) {
        this.id = dto.id;
        this.version = dto.version;
       
        this.assumptionNumber(dto.assumptionNumber);
        this.description(dto.description);
        this.workstream(dto.workstream);
        this.owner(dto.owner);
        this.validatedBy(dto.validatedBy);
        this.statusId(dto.statusId);
        this.supportingDocumentation(dto.supportingDocumentation);   
    }

    save() {
        var dto: ds.NewAssumptionDto = {
            description: this.description(),
            workstream: this.workstream(),
            owner: this.owner(),
            validatedBy: this.validatedBy(),
            statusId: this.statusId(),
            supportingDocumentation: this.supportingDocumentation()
        };

        var newItem = !this.id;

        if (!newItem) {
            var editDto = <ds.EditAssumptionDto>dto;
            editDto.id = this.id;
            editDto.version = this.version;
            editDto.assumptionNumber = this.assumptionNumber();
            editDto.projectId = this.projectId;
        }

        ds.saveAssumption(this.projectId, dto).done((data) => {
            this.updateFromDto(data);
            if (newItem) {
                this._newItemCallback(this);
            }
        });
    }


}

export = AssumptionDetails;