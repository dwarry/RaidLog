/// <reference path="../../Scripts/typings/durandal/durandal.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/knockout.validation/knockout.validation.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />

import ds = require('services/dataService');

class AssumptionDetails{

    id = 0;

    version = "";

    assumptionNumber = 0;

    description: KnockoutObservable<string> = ko.observable("").extend({ required: true, maxLength: 2048 });

    workstream: KnockoutObservable<string> = ko.observable("").extend({ require: true, maxLength: 50 });

    owner: KnockoutObservable<string> = ko.observable("").extend({ maxLength: 50 });

    validatedBy: KnockoutObservable<string> = ko.observable("").extend({ maxLength: 50 });

    statusId: KnockoutObservable<number> = ko.observable(<number>null).extend({ required: true });

    supportingDocumentation: KnockoutObservable<string> = ko.observable("").extend({ maxLength: 512 });

    validation: KnockoutValidatedObservable;

    canSave: KnockoutComputed<bool>;

    constructor(private projectId: number, dto: ds.AssumptionDto) {

        this.validation = ko.validatedObservable([
            this.description,
            this.workstream,
            this.owner,
            this.validatedBy,
            this.statusId,
            this.supportingDocumentation
        ]);

        this.canSave = ko.computed(() => this.validation.isValid(), this);

        this.updateFromDto(dto);
    }

    updateFromDto(dto: ds.AssumptionDto) {
        this.id = dto.id;
        this.version = dto.version;
       
        this.assumptionNumber = dto.assumptionNumber;
        this.description(dto.description);
        this.workstream(dto.workstream);
        this.owner(dto.owner);
        this.validatedBy(dto.validatedBy);
        this.statusId(dto.statusId);
        this.supportingDocumentation(dto.supportingDocumentation);   
    }

    save() {
        var dto: ds.NewAssumptionDto = {
            description:  this.description(),
            workstream:this.workstream(),
            owner: this.owner(),
            validatedBy: this.validatedBy(),
            statusId: this.statusId(),
            supportingDocumentation: this.supportingDocumentation()
        };

        if (this.id) {
            var editDto = <ds.EditAssumptionDto>dto;
            editDto.id = this.id;
            editDto.version = this.version;
            editDto.assumptionNumber = this.assumptionNumber;
            editDto.projectId = this.projectId;
        }

        ds.saveAssumption(this.projectId, dto);
    }
}

export = AssumptionDetails;