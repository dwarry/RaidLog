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

    title = ko.observable("Actions");

    listViewModel: pg.ListViewModel<ActionDetails>;

    canAddAction: KnockoutComputed<boolean>;

    private _mappingOptions: KnockoutMappingOptions;

    constructor() {

        this.listViewModel = new pg.ListViewModel<ActionDetails>({ data: ko.observableArray([]) });

        var newItemCallback = (item: ActionDetails) => { this.listViewModel.allData.push(item); };


        this._mappingOptions = {
            create: options => new ActionDetails(<ds.ActionDto>options.data,
                newItemCallback),
            key: (x) => x.id,
            'dueDate': { update: options => (options.data || "").substring(0, 10) },
            'resolvedDate': { update: options => (options.data || "").substring(0, 10) }
        };
        

        this.canAddAction = ko.computed(() => this.itemType !== 'Project', this);
    }

    activate(itemTypeParam: string, itemIdParam: number) {
        this.itemType = this.singularize(itemTypeParam);
        this.itemId = itemIdParam;
        return this.refresh();
    }

    private singularize(plural: string) {
        var len = plural.length;

        if (len === 0) {
            return "";
        }

        plural = plural.charAt(0).toUpperCase() + plural.substring(1);

        if (len >= 6 && plural.substring(len - 3) === "ies") {
            return plural.substring(0, len - 3) + "y";
        } else if (plural.charAt(plural.length - 1) === "s") {
            return plural.substring(0, len - 1);
        }

        return plural;
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

    addAction() {
    }
}

export = ActionList;