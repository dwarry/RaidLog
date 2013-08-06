/// <reference path="../../Scripts/typings/durandal/durandal.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/knockout.validation/knockout.validation.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />

import md = require("MasterDetailViewModel");
import rvm = require("./riskDetails");
import dataService = require("services/dataService");
import logger = require("services/logger");
import pg = require("./pagedGrid");

class riskList {

    projectId: number;

    projectCode = ko.observable("");

    projectName = ko.observable("");

    hideClosedItems = ko.observable(true);

    risks = ko.observableArray<rvm.RiskViewModel>([]);

    approaches = ko.observableArray<dataService.ApproachDto>();

    impacts = ko.observableArray<dataService.ImpactDto>();

    likelihoods = ko.observableArray<dataService.LikelihoodDto>();

    rifCategories = ko.observableArray<dataService.RifCategoryDto>();

    listViewModel: pg.ListViewModel<rvm.RiskViewModel>;

    private _mappingOptions: KnockoutMappingOptions;


    constructor() {
        var listConfig = { data: this.risks, pageSize:12 };

        this._mappingOptions = {
            key: (data) => data.id,
            create: (options: KnockoutMappingCreateOptions) =>
                new rvm(<dataService.RiskDto>options.data,
                    this.projectId,
                    (newItem: rvm) => { this.listViewModel.allData.push(newItem); }),
        };

        this.listViewModel = new pg.ListViewModel<rvm>(listConfig);
       
        this.listViewModel.filteredData = ko.computed(() => {
            var sf = this.listViewModel.searchField().trim();
            
            if (!this.listViewModel.searchPredicate || sf.length === 0) {
                return ko.utils.unwrapObservable(this.listViewModel.allData);
            }

            var result = ko.utils.arrayFilter(
                ko.utils.unwrapObservable(this.listViewModel.allData),
                x => (this.hideClosedItems() && !x.isActive())
                     ? false
                     : this.listViewModel.searchPredicate(sf, x));

            return result;
        }, this);

        this.listViewModel.searchPredicate = (s, item) => {
            var desc = item.description();
            return desc && desc.indexOf(s) !== -1;
        };
    }

    search(s: string) {
        this.listViewModel.searchField(s);
    }


    activate(projectIdParam) {
        
        this.projectId = projectIdParam;
        
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
        return dataService.getProjectRisks(this.projectId)
            .done((data) => { ko.mapping.fromJS(data, this._mappingOptions, this.risks); } );   
    }

    newRisk() {
        this.listViewModel.selected(
            ko.mapping.fromJS(dataService.makeRiskDto(), this._mappingOptions));
    }
}

export = riskList;