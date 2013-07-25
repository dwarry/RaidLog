/// <reference path="../../Scripts/typings/durandal/durandal.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/knockout.validation/knockout.validation.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />

import md = module("MasterDetailViewModel");
import rvm = module("./RiskViewModel");
import dataService = module("services/dataService");
import logger = module("services/logger");
import pg = module("./pagedGrid");

class RiskListViewModel {

    projectId: number;

    projectCode = ko.observable("");

    projectName = ko.observable("");

    activeItems = ko.observable(true);

    risks = ko.observableArray<rvm.RiskViewModel>();

    approaches = ko.observableArray<dataService.ApproachDto>();

    impacts = ko.observableArray<dataService.ImpactDto>();

    likelihoods = ko.observableArray<dataService.LikelihoodDto>();

    rifCategories = ko.observableArray<dataService.RifCategoryDto>();

    listViewModel: pg.ListViewModel<rvm.RiskViewModel>;

    private _mappingOptions: KnockoutMappingOptions;


    constructor() {
        var listConfig = { data: this.risks };

        this._mappingOptions = {
            key: (data) => data.id,
            create: (options: KnockoutMappingCreateOptions) =>
                new rvm.RiskViewModel(<dataService.RiskDto>options.data,
                    (newItem: rvm.RiskViewModel) => { this.listViewModel.allData.push(newItem); }),
        };

        this.listViewModel = new pg.ListViewModel<rvm.RiskViewModel>(listConfig);
        
        this.listViewModel.searchPredicate = (s, item) => item.description.indexOf(s) !== -1;
    }

    search(s: string) {
        this.listViewModel.searchField(s);
    }


    activate(projectIdParam, activeParam){
        this.projectId = projectIdParam;
        this.activeItems(activeParam);

        var getRefData = dataService.getReferenceData().done((data: dataService.ReferenceDataDto) => {
            this.approaches(data.approaches);
            this.impacts(data.impacts);
            this.likelihoods(data.likelihoods);
            this.rifCategories(data.rifCategories);
        });

        var getProject = dataService.getProject(this.projectId).done((data: dataService.ProjectDto) => {
            this.projectId = data.id;
            this.projectCode(data.code);
            this.projectName(data.name);
        });

        var getRisks = this.refresh();

        return $.when([getRefData, getProject, getRisks]);
    }

    refresh() {
        return dataService.getProjectRisks(this.projectId, this.activeItems())
                          .done((data) => ko.mapping.fromJS(this.risks(data),this._mappingOptions));   
    }


}

