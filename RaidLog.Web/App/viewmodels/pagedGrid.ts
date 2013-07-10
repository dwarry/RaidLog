
/// <reference path='../../Scripts/typings/knockout/knockout.amd.d.ts' />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
import ko = require("knockout")

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

function addTemplate(templateName: string, templateMarkup: string) {
    if (document.getElementById(templateName) === null) {
    
        document.write("<script type='text/html' id='" + templateName + "'>" + templateMarkup + "<" + "/script>");
    }    
}

addTemplate("ko_simpleGrid_grid", "\
                    <table class=\"ko-grid\" cellspacing=\"0\">\
                        <thead>\
                            <tr data-bind=\"foreach: columns\">\
                               <th data-bind=\"text: headerText\"></th>\
                            </tr>\
                        </thead>\
                        <tbody data-bind=\"foreach: itemsOnCurrentPage\">\
                           <tr data-bind=\"foreach: $parent.columns\">\
                               <td data-bind=\"text: typeof rowText == 'function' ? rowText($parent) : $parent[rowText] \"></td>\
                            </tr>\
                        </tbody>\
                    </table>");

addTemplate("ko_simpleGrid_pageLinks", "\
                    <div class=\"ko-grid-pageLinks\">\
                        <span>Page:</span>\
                        <!-- ko foreach: ko.utils.range(0, maxPageIndex) -->\
                               <a href=\"#\" data-bind=\"text: $data + 1, click: function() { $root.currentPageIndex($data) }, css: { selected: $data == $root.currentPageIndex() }\">\
                            </a>\
                        <!-- /ko -->\
                    </div>");

interface KnockoutBindingHandlers {
    pagedGrid: KnockoutBindingHandler;
}

var templateEngine = new ko.templateEngine();

ko.bindingHandlers['pagedGrid'] = {
        init: function () {
            return { 'controlsDescendantBindings': true };
        },
        // This method is called to initialize the node, and will also be called again if you change what the grid is bound to
        update: function (element, viewModelAccessor, allBindingsAccessor) {
            var viewModel = viewModelAccessor(), allBindings = allBindingsAccessor();

            // Empty the element
            while (element.firstChild)
                ko.removeNode(element.firstChild);

            // Allow the default templates to be overridden
            var gridTemplateName = allBindings.simpleGridTemplate || "ko_simpleGrid_grid",
                pageLinksTemplateName = allBindings.simpleGridPagerTemplate || "ko_simpleGrid_pageLinks";

            // Render the main grid
            var gridContainer = element.appendChild(document.createElement("DIV"));
            ko.renderTemplate(gridTemplateName, viewModel, { templateEngine: templateEngine }, gridContainer, "replaceNode");

            // Render the page links
            var pageLinksContainer = element.appendChild(document.createElement("DIV"));
            ko.renderTemplate(pageLinksTemplateName, viewModel, { templateEngine: templateEngine }, pageLinksContainer, "replaceNode");
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
    
    constructor(config: ListViewModelConfiguration<T>) {
        this.allData = config.data;
        this.pageSize = config.pageSize || 10;

        this.itemsOnCurrentPage = ko.computed(function () {
            var startIndex = this.pageSize * this.currentPageIndex();
            return this.filteredData().slice(startIndex, startIndex + this.pageSize);
        }, this);

        this.maxPageIndex = ko.computed(function () {
            return Math.ceil(this.filteredData().length / this.pageSize) - 1;
        }, this);

        this.columns = config.columns || getColumnsForScaffolding(ko.utils.unwrapObservable(this.allData));
    }

    setSelected(item: T) {
        if (this.selected() === item) {
            this.selected(null);
        }
        else {
            this.selected(item);
        }
    }

    allData = ko.observableArray<T>();

    columns: PagedGridColumns[];

    currentPageIndex = ko.observable<number>(0);

    pageSize: number;

    itemsOnCurrentPage: KnockoutComputed<any>;

    maxPageIndex: KnockoutComputed<number>;

    selected = ko.observable<T>(null);

    searchField = ko.observable<string>();

    searchPredicate: (string, t:T) => boolean = null;

    filteredData = ko.computed(function () {
        if (!this.searchPredicate) {
            return ko.utils.unwrapObservable(this.allData());
        }

        var result = ko.utils.arrayFilter(
            ko.utils.unwrapObservable(this.allData()),
            x => this.searchPredicate(this.searchField, x) );

        return result;
    });

        
}
