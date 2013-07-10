define(["require", "exports", "knockout"], function(require, exports, __ko__) {
    var ko = __ko__;

    function addTemplate(templateName, templateMarkup) {
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

    var templateEngine = new ko.templateEngine();

    ko.bindingHandlers['pagedGrid'] = {
        init: function () {
            return { 'controlsDescendantBindings': true };
        },
        update: function (element, viewModelAccessor, allBindingsAccessor) {
            var viewModel = viewModelAccessor(), allBindings = allBindingsAccessor();

            while (element.firstChild)
                ko.removeNode(element.firstChild);

            var gridTemplateName = allBindings.simpleGridTemplate || "ko_simpleGrid_grid", pageLinksTemplateName = allBindings.simpleGridPagerTemplate || "ko_simpleGrid_pageLinks";

            var gridContainer = element.appendChild(document.createElement("DIV"));
            ko.renderTemplate(gridTemplateName, viewModel, { templateEngine: templateEngine }, gridContainer, "replaceNode");

            var pageLinksContainer = element.appendChild(document.createElement("DIV"));
            ko.renderTemplate(pageLinksTemplateName, viewModel, { templateEngine: templateEngine }, pageLinksContainer, "replaceNode");
        }
    };

    function getColumnsForScaffolding(data) {
        if ((typeof data.length !== 'number') || data.length === 0) {
            return [];
        }
        var columns = [];
        for (var propertyName in data[0]) {
            columns.push({ headerText: propertyName, rowText: propertyName });
        }
        return columns;
    }

    var ListViewModel = (function () {
        function ListViewModel(config) {
            this.allData = ko.observableArray();
            this.currentPageIndex = ko.observable(0);
            this.selected = ko.observable(null);
            this.searchField = ko.observable();
            this.searchPredicate = null;
            this.filteredData = ko.computed(function () {
                var _this = this;
                if (!this.searchPredicate) {
                    return ko.utils.unwrapObservable(this.allData());
                }

                var result = ko.utils.arrayFilter(ko.utils.unwrapObservable(this.allData()), function (x) {
                    return _this.searchPredicate(_this.searchField, x);
                });

                return result;
            });
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
        ListViewModel.prototype.setSelected = function (item) {
            if (this.selected() === item) {
                this.selected(null);
            } else {
                this.selected(item);
            }
        };
        return ListViewModel;
    })();
    exports.ListViewModel = ListViewModel;
});
