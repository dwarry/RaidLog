/// <reference path="../../Scripts/typings/durandal/durandal.d.ts" />
/// <reference path="../../Scripts/typings/knockout.validation/knockout.validation.d.ts" />
/// <reference path="../../Scripts/typings/knockout.mapping/knockout.mapping.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../services/dataService.ts" />
/// <reference path="pagedGrid.ts" />


import dataService = require("services/dataService");
import logger = require("services/logger");
import pg = require("viewmodels/pagedGrid");

export class MasterDetailViewModel<T>{

    listVM: pg.ListViewModel<T>;

    // should specify at least the 'key' property
    koMappingOptions: KnockoutMappingOptions = {};

    
    constructor() {
        this.listVM= new pg.ListViewModel<T>({data: ko.observableArray(),pageSize:20});
    }

    // override this to actually retrieve the data the VM is going to display. 
    doRefresh() {
        logger.logWarning("dummy doRefresh invoked", this, "viewmodels/MasterDetailViewModel", false);
        return $.Deferred().resolve(<T[]>null).promise();
    }

    refresh(){
        return this.doRefresh().done(function(results){
            
            ko.mapping.fromJS(results, this.koMappingOptions, this.listVM.allData);
        });
    }

    // override this to create a new item.
    doNewItem(): T { return <T>null; }

    newItem() {
        this.listVM.selected(this.doNewItem());
    }
    
    // override this to do whatever is required to add the new item 
    doItemWasAdded(): void {
        if(this.listVM.allData.indexOf(this.listVM.selected()) !== -1) {
            this.listVM.allData.unshift(this.listVM.selected());
        }
    }

    doItemWasRemoved(oldItem: T): void {
        this.listVM.allData.remove(oldItem);
    }


}

export class MasterDetailViewModel2<TDto, TDetailVm>{

    listVM: pg.ListViewModel<TDetailVm>;

    // should specify at least the 'key' property
    koMappingOptions: KnockoutMappingOptions = {};


    constructor(vm: (data: TDto) => TDetailVm) {

        this.koMappingOptions.create = vm;

        this.listVM = new pg.ListViewModel<TDetailVm>({ data: ko.observableArray(), pageSize: 20 });
    }

    // override this to actually retrieve the data the VM is going to display. 
    doRefresh() {
        logger.logWarning("dummy doRefresh invoked", this, "viewmodels/MasterDetailViewModel", false);
        return $.Deferred().resolve(<TDto[]>null).promise();
    }

    refresh() {
        this.doRefresh().done(function (results) {

            ko.mapping.fromJS(results, this.koMappingOptions, this.listVM.allData);
        });
    }

    // override this to create a new item.
    doNewItem(): TDto { return <TDto>null; }

    newItem() {
        var newVm = ko.mapping.fromJS(this.doNewItem(), this.koMappingOptions, null);

        this.listVM.selected(newVm);
    }

    // override this to do whatever is required to add the new item 
    doItemWasAdded(newItem: TDto): void {
        var newVm = ko.mapping.fromJS(this.doNewItem(), this.koMappingOptions, null);

        this.listVM.allData.unshift(newVm);
    }

    doItemWasRemoved(oldItem: TDetailVm): void {
        this.listVM.allData.remove(oldItem);
    }


}
