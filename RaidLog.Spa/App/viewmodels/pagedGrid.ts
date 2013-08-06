/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
export interface ListViewModelConfiguration<T>{
    data: KnockoutObservableArray<T>;

    pageSize?: number;

    columns?: PagedGridColumns[];

    template?: string;
}

export interface PagedGridColumns {
    headerText: string;
    rowText: any;
}

// Hmmm. Still need to work out how to do this 'properly'...
module Knockout {
    interface KnockoutBindingHandlers {
        pagedGrid: KnockoutBindingHandler;
    }
}

var templateEngine = new ko.nativeTemplateEngine();

ko.bindingHandlers['pagedGrid'] = {
        init: function () {
            return { 'controlsDescendantBindings': true };
        },
        // This method is called to initialize the node, and will also be called again if you change what the grid is bound to
        update: function (element, viewModelAccessor, allBindingsAccessor) {
            var viewModel = viewModelAccessor(), allBindings = allBindingsAccessor();

            
            // Allow the default templates to be overridden
            var gridTemplate = allBindings.pagedGridTemplate || "ko_simpleGrid_grid",
                pageLinksTemplate = allBindings.pagedGridPagerTemplate || "ko_simpleGrid_pageLinks";

            // Empty the element
            while (element.firstChild)
                ko.removeNode(element.firstChild);

            // Render the main grid
            var gridContainer = element.appendChild(document.createElement("DIV"));
            ko.renderTemplate(gridTemplate, viewModel, { templateEngine: templateEngine }, gridContainer, "replaceNode");

            // Render the page links
            var pageLinksContainer = element.appendChild(document.createElement("DIV"));
            ko.renderTemplate(pageLinksTemplate, viewModel, { templateEngine: templateEngine }, pageLinksContainer, "replaceNode");
        }
    };


function getColumnsForScaffolding(data): PagedGridColumns[] {
    if ((typeof data.length !== 'number') || data.length === 0) {
        return [];
    }
    var columns = [];
    for (var propertyName in data[0]) {
        columns.push({ headerText: propertyName, rowText: propertyName });
    }
    return columns;
}

export class ListViewModel<T>{
    
    
    allData = ko.observableArray<T>();

    columns: PagedGridColumns[];

    currentPageIndex = ko.observable<number>(0);

    pageSize: number;

    itemsOnCurrentPage: KnockoutComputed<any>;

    maxPageIndex: KnockoutComputed<number>;

    selected = ko.observable<T>(null);

    searchField = ko.observable<string>("");

    public searchPredicate: (string, t: T) => boolean = null;

    filteredData: KnockoutComputed<T[]>;

    setSelected: (item: T) => void;

    constructor(config: ListViewModelConfiguration<T>) {
        this.allData = config.data;
        this.pageSize = config.pageSize || 10;

        this.filteredData = ko.computed(() => {
            var sf = this.searchField().trim();

            if (!this.searchPredicate || sf.length === 0) {
                return ko.utils.unwrapObservable(this.allData);
            }

            var result = ko.utils.arrayFilter(
                ko.utils.unwrapObservable(this.allData),
                x => this.searchPredicate(sf, x));

            return result;
        },this);
        
        this.itemsOnCurrentPage = ko.computed(() => {
            var startIndex = this.pageSize * this.currentPageIndex();
            return this.filteredData().slice(startIndex, startIndex + this.pageSize);
        }, this);

        this.maxPageIndex = ko.computed(() => {
            return Math.ceil(this.filteredData().length / this.pageSize) - 1;
        }, this);

        this.columns = config.columns || getColumnsForScaffolding(ko.utils.unwrapObservable(this.allData));

        this.setSelected = (item: T) => {
            if (this.selected() === item) {
                this.selected(null);
            }
            else {
                this.selected(item);
            }

            return true;
        };

    }


        
}
