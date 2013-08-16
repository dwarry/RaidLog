/// <reference path="../../Scripts/typings/durandal/durandal.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/knockout.validation/knockout.validation.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
import dlg = require('plugins/dialog');

import ds = require('services/dataService');
import rf = require('services/routeFactory');
import router = require('plugins/router');
import ActionDetailsDialog = require('./actionDetailsDialog');

var ragStatuses = ["Green", "Amber", "Red"];

class IssueDetails{
   

    id = ko.observable(0); 

    version = ko.observable("");

    isResolved: KnockoutComputed<boolean>;

    isNew: KnockoutComputed<boolean>;

    raisedDate= ko.observable(moment().local().format("YYYY-MM-DD")).extend({ required: true, dateISO: true });

    raisedBy: KnockoutObservable<string> = ko.observable().extend({ required: true, maxLength: 50 });

    issueNumber: KnockoutObservable<number> = ko.observable();//.extend({min:0,max:99999});

    description: KnockoutObservable<string> = ko.observable().extend({ required: true, maxLength: 2048 });

    workstream: KnockoutObservable<string> = ko.observable().extend({ required: true, maxLength: 50 });

    owner: KnockoutObservable<string> = ko.observable().extend({ maxLength: 50 });

    commentary: KnockoutObservable<string> = ko.observable().extend({ maxLength: 2048 });

    resolvedDate: KnockoutObservable<string> =  ko.observable().extend({ dateISO: true });

    resolvedBy: KnockoutObservable<string> = ko.observable();

    resolutionDescription: KnockoutObservable<string> = ko.observable().extend({ maxLength: 512 });

    validation: KnockoutValidatedObservable;

    ragStatus: KnockoutObservable<string> = ko.observable();

    previousRagStatus: KnockoutObservable<string> = ko.observable();

    expectedClosureDate: KnockoutObservable<string> = ko.observable().extend({ dateISO: true });

    isEscalatedToProgramme: KnockoutObservable<boolean> = ko.observable();

    ragClass: KnockoutComputed<string>;

    ragStatuses: string[] = ragStatuses;

    constructor(private _projectId: number,
        dto: ds.IssueDto,
        private _newItemCallback: (item: IssueDetails) => void) {
    
        this.isResolved = ko.computed(() => {
            var dt = this.resolvedDate();
            return dt != null && dt.length > 0;
        }, this);

        this.isNew = ko.computed(() => !this.id(), this);
        
        this.resolvedBy.extend({ required: { onlyIf: this.isResolved }, maxLength: 50 });

        this.resolutionDescription.extend({ required: { onlyIf: this.isResolved }, maxLength: 512 });

        this.validation = ko.validatedObservable([this.raisedDate,  
            this.raisedBy, this.description, this.workstream,
            this.owner, this.commentary, this.resolvedDate, this.resolvedBy, this.resolutionDescription])

        this.ragClass = ko.computed(() => "rag" + this.ragStatus(), this);

        this.updateFromDto(dto);
    }

    updateFromDto(dto: ds.IssueDto) {
        this.id(dto.id);
        this.version(dto.version);
        this.issueNumber(dto.issueNumber);
        this.description(dto.description);
        this.workstream(dto.workstream);
        this.owner(dto.owner);
        this.commentary(dto.commentary);
        this.raisedDate(dto.raisedDate.substring(0,10));
        this.raisedBy(dto.raisedBy);
        this.resolvedDate((dto.resolvedDate || "").substring(0,10));
        this.resolvedBy(dto.resolvedBy);
        this.resolutionDescription(dto.resolutionDescription);
        this.ragStatus(dto.ragStatus);
        this.previousRagStatus(dto.previousRagStatus);
        this.expectedClosureDate((dto.expectedClosureDate || "").substring(0,10));
        this.isEscalatedToProgramme(dto.isEscalatedToProgramme);
    }

    save() {
        var isNewItem = !this.id();

        var dto:any = {
            description: this.description(),
            workstream: this.workstream(),
            owner: this.owner(),
            commentary: this.commentary(),
            ragStatus: this.ragStatus(),
            expectedClosureDate: this.expectedClosureDate()
        };

        if (isNewItem) {
            dto.raisedDate = this.raisedDate();
            dto.raisedBy = this.raisedBy();
        } else {
            dto.id = this.id();
            dto.version = this.version();
            dto.resolvedDate = this.resolvedDate();
            dto.resolvedBy = this.resolvedBy();
            dto.resolutionDescription = this.resolutionDescription();
            dto.isEscalatedToProgramme = this.isEscalatedToProgramme();
        }

        ds.saveIssue(this._projectId, dto).done(data => {
            this.updateFromDto(data);
            if (isNewItem) {
                this._newItemCallback(this);
            }
        });
    }

    addAction() {
        var action = ds.makeActionDto();
        action.parentItemType = "Issue";
        action.parentItemId = this.id();

        var ad = new ActionDetailsDialog(action);

        dlg.show(ad); 
    }

    showActions() {
        var route = rf.makeItemActionLink('issue', this.id());

        router.navigate(route);
    }
}

export = IssueDetails;