/// <reference path="../../Scripts/typings/durandal/durandal.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/knockout.validation/knockout.validation.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />

import md = module("MasterDetailViewModel");
import rvm = module("./RiskViewModel");
import dataService = module("services/dataService");
import logger = module("services/logger");

class RiskListViewModel extends md.MasterDetailViewModel<dataService.RiskDto>{

    projectId: number;
    
    projectCode = ko.observable("");

    projectName = ko.observable("");

    activeItems = ko.observable(true);

    approaches = ko.observableArray<dataService.ApproachDto>();

    impacts = ko.observableArray<dataService.ImpactDto>();

    likelihoods = ko.observableArray<dataService.LikelihoodDto>();

    riskViewModel = new rvm.RiskViewModel();
    


    constructor() {

        super();

        this.koMappingOptions = {
            key: (x) => x.id,
        };
    }

    activate(projectIdParam, activeParam){
        this.projectId = projectIdParam;
        this.activeItems(activeParam);

        var getRefData = dataService.getReferenceData().done((data: dataService.ReferenceDataDto) => {
            this.approaches(data.approaches);
            this.impacts(data.impacts);
            this.likelihoods(data.likelihoods);
        });

        var getProject = dataService.getProject(this.projectId).done((data: dataService.ProjectDto) => {
            this.projectId = data.id;
            this.projectCode(data.code);
            this.projectName(data.name);
        });

        var getRisks = this.refresh();

        return $.when([getRefData, getProject, getRisks]);
    }

    doRefresh() {
        return dataService.getProjectRisks(this.projectId, this.activeItems());   
    }

    private impactScore(impactId: number):number {
        var result = 0;

        $.each(this.impacts(), (i, impact) => {
            if (impact.id === impactId) {
                result = impact.score;
                return false;
            }
            return true;
        });

        return result;
    }

    private likelihoodScore(likelihoodId: number): number {
        var result = 0;

        $.each(this.likelihoods, (i, likelihood) => {
            if (likelihood.id === likelihoodId) {
                result = likelihood.score;
                return false;
            }
            return true;
        });

        return result;
    }
}

