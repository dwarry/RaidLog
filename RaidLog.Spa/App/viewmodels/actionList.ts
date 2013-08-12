/// <reference path="../../Scripts/typings/durandal/durandal.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />y
/// <reference path="../../Scripts/typings/knockout.validation/knockout.validation.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />

import ds = require('services/dataService');
import pg = require("./pagedGrid");
import ActionDetails = require("./actionDetails");

class ActionList{
    itemType: string;
    itemId: number;

    title = ko.observable("");

    listViewModel: pg.ListViewModel<ActionDetails>;

    canAdd: KnockoutComputed<boolean>;

    private _mappingOptions: KnockoutMappingOptions;

    constructor() {
        this.listViewModel = new pg.ListViewModel<ActionDetails>({ data: ko.observableArray([]) });

        var newItemCallback = (item: ActionDetails) => { this.listViewModel.allData.push(item); };


        this._mappingOptions = {
            create: options => new ActionDetails(<ds.ActionDto>options.data,
                newItemCallback),
            key: (x) => x.id
        };
        

        this.canAdd = ko.computed(() => this.itemType !== 'Project', this);
    }

    activate(itemTypeParam: string, itemIdParam: number) {
        this.itemType = itemTypeParam;
        this.itemId = itemIdParam;
    }

    refresh() {
        if (this.itemType == "Project") {

            if (this.title() === "") {
                ds.getProject(this.itemId).done(proj => { this.title("Actions for " + proj.description); });

            }

            ds.getProjectActions(this.itemId).done(data => {

                ko.mapping.fromJS(data, this._mappingOptions, this.listViewModel.allData);
            });
                
        } else {
            this.title(this.itemType + " Actions");

            ds.getActionsFor(this.itemType, this.itemId).done(data => {
                ko.mapping.fromJS(data, this._mappingOptions, this.listViewModel.allData);
            });
        }
    }
}

export = ActionList;