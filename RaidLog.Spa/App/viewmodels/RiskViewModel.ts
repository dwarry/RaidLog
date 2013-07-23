/// <reference path="../../Scripts/typings/moment/moment.d.ts" />
/// <reference path="../../Scripts/typings/durandal/durandal.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/knockout.validation/knockout.validation.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />

import dataService = module("services/dataService");
import logger = module("services/logger");
import evm = module("EditableViewModel");

export class RiskViewModel extends evm.EditableViewModel<dataService.RiskDto>{

    id: number;

    version: string;

    riskNumber = ko.observable(0);

    description = ko.observable("").extend({ required: true, maxLength: 2048 });

    raisedDate = ko.observable(moment().local().format("YYYY-MM-DD")).extend({ required: true, dateISO: true });

    raisedBy = ko.observable("").extend({ required: true, maxLength: 50 });
    
    rifCategoryId = ko.observable<number>().extend({ required: true });

    isProjectRisk = ko.observable(true);

    workstream = ko.observable("").extend({ required: true, maxLength: 50 });

    commentary = ko.observable("").extend({ required: true, maxLength: 2048 });
    
    approachId = ko.observable<number>(null).extend({ required: true });

    impactId = ko.observable<number>(null).extend({ required: true });

    likelihoodId = ko.observable<number>(null).extend({ required: true });

    owner = ko.observable("").extend({ required: true, maxLength: 50 });

    isActive = ko.observable(true);
    
    

    constructor(item: dataService.RiskDto, public projectId: number) {
        super(item, "Risk");

        this.isNewItem = ko.computed<boolean>(() => this.id === 0, this);

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
        
        this.canSave = ko.computed<boolean>(() => this.validation.isValid(), this);        
        
    }

    doSaveItem() {
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

        if (!this.isNewItem()) {
            dto['id'] = this.id;
            dto['version'] = this.version;       
        }

        return dataService.saveRisk(this.projectId, dto).done(
            (data) => {
                this.item = data;
                this.updateFromItem();
            });
            
    }

}
