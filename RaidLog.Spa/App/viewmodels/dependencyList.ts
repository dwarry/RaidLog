import ds = require("services/dataService");

import pg = require("./pagedGrid");

import DependencyDetail = require("./dependencyDetail");

class DependencyList {
	
    private _projectId = 0;

    projectCode = ko.observable("");
    projectName = ko.observable("");

    listViewModel =  new pg.ListViewModel<DependencyDetail>({data: ko.observableArray<DependencyDetail>([])});

    private _mappingOptions: KnockoutMappingOptions;

    constructor(){
	        var newItemCallback = (item: DependencyDetail) => { this.listViewModel.allData.push(item); };


        this._mappingOptions = {
            create: options => new DependencyDetail(this._projectId, 
                <ds.DependencyDto>options.data,
                newItemCallback),
            key: (x) => x.id,
            'plannedDate': { update: options => (options.data || "").substring(0, 10) },
            'requiredByDate': { update: options => (options.data || "").substring(0, 10) }
        };
    }

    activate(projectIdParam:number){
	    this._projectId = projectIdParam;


        ds.getProject(this._projectId).done((data: ds.ProjectDto) => {
            this.projectCode(data.code);
            this.projectName(data.name);
        });


        this.refresh();
    }

    newDependency() {
        this.listViewModel.selected(
            ko.mapping.fromJS(ds.makeDependencyDto(this._projectId), this._mappingOptions));

    }

    refresh(){
        ds.getProjectDependencies(this._projectId).done(data => {
	        
            ko.mapping.fromJS(data, this._mappingOptions, this.listViewModel.allData);
        });	
    }
}

export = DependencyList;