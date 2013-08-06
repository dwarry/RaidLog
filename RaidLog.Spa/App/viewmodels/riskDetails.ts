/// <reference path="../../Scripts/typings/moment/moment.d.ts" />
/// <reference path="../../Scripts/typings/durandal/durandal.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/knockout.validation/knockout.validation.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />

import dataService = require("services/dataService");
import logger = require("services/logger");

var refData: dataService.ReferenceDataDto;

dataService.getReferenceData().done((rd) => { refData = rd; });

function impactScore(impactId: number):number {
    var result = 0;

    $.each(refData.impacts, (i, impact) => {
        if (impact.id === impactId) {
            result = impact.score;
            return false;
        }
        return true;
    });

    return result;
}

function likelihoodScore(likelihoodId: number): number {
    var result = 0;

    $.each(refData.likelihoods, (i, likelihood) => {
        if (likelihood.id === likelihoodId) {
            result = likelihood.score;
            return false;
        }
        return true;
    });

    return result;
}


class RiskDetails {



    id: number;

    version: string;

    riskNumber = ko.observable(0);

    description = ko.observable("").extend({ required: true, maxLength: 2048 });

    raisedDate = ko.observable(moment().local().format("YYYY-MM-DD")).extend({ required: true, dateISO: true });

    raisedBy = ko.observable("").extend({ required: true, maxLength: 50 });
    
    rifCategoryId = ko.observable<number>().extend({ required: true });

    isProjectRisk = ko.observable(true);

    workstream = ko.observable("").extend({ required: true, maxLength: 50 });

    commentary = ko.observable("").extend({ maxLength: 2048 });
    
    approachId = ko.observable<number>(null).extend({ required: true });

    impactId = ko.observable<number>(null).extend({ required: true });

    likelihoodId = ko.observable<number>(null).extend({ required: true });

    owner = ko.observable("").extend({ maxLength: 50 });

    isActive = ko.observable(true);
    
    validation: KnockoutValidatedObservable;

    score: KnockoutComputer<number>;

    rag: KnockoutComputed<string>;

    canSave: KnockoutComputed<boolean>;

    canDelete: KnockoutComputed<boolean>;

    

    constructor(item: dataService.RiskDto,
        private projectId: number, 
        private newItemCallback: (rvm: RiskDetails) => void ) {

        this.score = ko.computed(() => impactScore(this.impactId()) * likelihoodScore(this.likelihoodId()), this);
        
        this.rag = ko.computed(() => {
            var sc = this.score();

            if (sc <= 5) {
                return "ragGreen";
            }
            if (sc >= 15) {
                return "ragRed";
            }

            return "ragAmber";
        });

        this.validation = ko.validatedObservable([
            this.riskNumber,
            this.description,
            this.raisedDate,
            this.raisedBy,
            this.rifCategoryId,
            this.isProjectRisk,
            this.workstream,
            this.commentary,
            this.approachId,
            this.impactId,
            this.likelihoodId,
            this.owner, 
            this.isActive
        ]);
        
        this.updateFromItem(item);

        this.canSave = ko.computed<boolean>(() => this.validation.isValid(), this);        
        
        this.canDelete = ko.computed<boolean>(() => this.id !== 0);
    }

    get isNewItem(): boolean {
        return this.id === 0;
    } 

    updateFromItem(item: dataService.RiskDto) {
        
        if (item == null) {
            this.id = 0;
            this.version = "";
            this.riskNumber(null);
            this.description("");
            this.raisedDate(moment().format("YYYY-MM-DD"));
            this.raisedBy("");
            this.rifCategoryId(null);
            this.isProjectRisk(true);
            this.workstream("");
            this.commentary("");
            this.approachId(null);
            this.impactId(null);
            this.likelihoodId(null);
            this.owner("");
        }
        else {
            this.id = item.id;
            this.version = item.version;
            this.riskNumber(item.riskNumber);
            this.description(item.description);
            this.raisedDate(item.raisedDate.substring(0,10));
            this.raisedBy(item.raisedBy);
            this.rifCategoryId(item.rifCategoryId);
            this.isProjectRisk(item.isProjectRisk);
            this.workstream(item.workstream);
            this.commentary(item.commentary);
            this.approachId(item.approachId);
            this.impactId(item.impactId);
            this.likelihoodId(item.likelihoodId);
            this.owner(item.owner);
             
        }
    }

    saveItem() {
        var dto: dataService.NewRiskDto = {
            description: this.description(),
            raisedDate: this.raisedDate(),
            raisedBy: this.raisedBy(),
            rifCategoryId: this.rifCategoryId(),
            isProjectRisk: this.isProjectRisk(),
            workstream: this.workstream(),
            commentary: this.commentary(),
            approachId: this.approachId(),
            impactId: this.impactId(),
            likelihoodId: this.likelihoodId(),
            owner: this.owner()
        };

        var isNewItem = this.isNewItem;

        if (!isNewItem) {
            dto['id'] = this.id;
            dto['version'] = this.version;       
        }

        return dataService.saveRisk(this.projectId, dto).done(
            (data) => {
                this.updateFromItem(data);

                if (isNewItem) {
                    this.newItemCallback(this);
                }
            });
    
    }



}

export = RiskDetails;