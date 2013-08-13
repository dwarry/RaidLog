define(["require", "exports"], function(require, exports) {
    var templateEngine = new ko.nativeTemplateEngine();

    ko.bindingHandlers['pagedGrid'] = {
        init: function () {
            return { 'controlsDescendantBindings': true };
        },
        // This method is called to initialize the node, and will also be called again if you change what the grid is bound to
        update: function (element, viewModelAccessor, allBindingsAccessor) {
            var viewModel = viewModelAccessor(), allBindings = allBindingsAccessor();

            // Allow the default templates to be overridden
            var gridTemplate = allBindings.pagedGridTemplate || "ko_simpleGrid_grid", pageLinksTemplate = allBindings.pagedGridPagerTemplate || "ko_simpleGrid_pageLinks";

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
            var _this = this;
            this.allData = ko.observableArray();
            this.currentPageIndex = ko.observable(0);
            this.selected = ko.observable(null);
            this.searchField = ko.observable("");
            this.searchPredicate = null;
            this.allData = config.data;
            this.pageSize = config.pageSize || 10;

            this.filteredData = ko.computed(function () {
                var sf = _this.searchField().trim();

                if (!_this.searchPredicate || sf.length === 0) {
                    return ko.unwrap(_this.allData);
                }

                var result = ko.utils.arrayFilter(ko.unwrap(_this.allData), function (x) {
                    return _this.searchPredicate(sf, x);
                });

                return result;
            }, this);

            this.itemsOnCurrentPage = ko.computed(function () {
                var startIndex = _this.pageSize * _this.currentPageIndex();
                return _this.filteredData().slice(startIndex, startIndex + _this.pageSize);
            }, this);

            this.maxPageIndex = ko.computed(function () {
                return Math.ceil(_this.filteredData().length / _this.pageSize) - 1;
            }, this);

            this.columns = config.columns || getColumnsForScaffolding(ko.unwrap(this.allData));

            this.setSelected = function (item) {
                if (_this.selected() === item) {
                    _this.selected(null);
                } else {
                    _this.selected(item);
                }

                return true;
            };
        }
        return ListViewModel;
    })();
    exports.ListViewModel = ListViewModel;
});
