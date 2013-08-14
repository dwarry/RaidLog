import ds = require("services/dataService");

import pg = require("./pagedGrid");

import DependencyDetail = require("./dependencyDetail");

class DependencyList {
	
    private _projectId = 0;

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
        this.refresh();
    }

    refresh(){
        ds.getProjectDependencies(this._projectId).done(data => {
	        
            ko.mapping.fromJS(data, this._mappingOptions, this.listViewModel.allData);
        });	
    }
}

export = DependencyList;