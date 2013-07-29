/*
 * Adapted from one of the live samples on the Knockoutjs website.
 * 
 * Templates for the specific grids are being put in here because it's not
 * obvious how to include them in the view, because they will be needed before
 * the view is attached to the DOM, so the TemplateEngine won't find them. Messy,
 * and I may move them into a separate js file
 */
(function () {
    // Private function
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

    ko.simpleGrid = {
        // Defines a view model class you can use to populate a grid
        viewModel: function (configuration) {
            this.data = configuration.data;
            this.currentPageIndex = ko.observable(0);
            this.pageSize = configuration.pageSize || 5;

            // If you don't specify columns configuration, we'll use scaffolding
            this.columns = configuration.columns || getColumnsForScaffolding(ko.utils.unwrapObservable(this.data));

            this.itemsOnCurrentPage = ko.computed(function () {
                var startIndex = this.pageSize * this.currentPageIndex();
                return this.data.slice(startIndex, startIndex + this.pageSize);
            }, this);

            this.maxPageIndex = ko.computed(function () {
                return Math.ceil(ko.utils.unwrapObservable(this.data).length / this.pageSize) - 1;
            }, this);

            this.selected = ko.observable();
        }
    };

    // Templates used to render the grid
    var templateEngine = new ko.nativeTemplateEngine();

    templateEngine.addTemplate = function (templateName, templateMarkup) {
        document.write("<script type='text/html' id='" + templateName + "'>" + templateMarkup + "<" + "/script>");
    };

    templateEngine.addTemplate("ko_simpleGrid_grid", "\
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
    templateEngine.addTemplate("ko_simpleGrid_pageLinks", "\
                    <div class=\"ko-grid-pageLinks\">\
                        <span>Page:</span>\
                        <!-- ko foreach: ko.utils.range(0, maxPageIndex) -->\
                               <a href=\"#\" data-bind=\"text: $data + 1, click: function() { $root.currentPageIndex($data) }, css: { selected: $data == $root.currentPageIndex() }\">\
                            </a>\
                        <!-- /ko -->\
                    </div>");

    templateEngine.addTemplate("riskListTemplate", "<table id='riskTable' class='table table-bordered table-condensed table-striped'>\
            <thead>\
                <tr>\
                    <th>#</th>\
                    <th>Description</th>\
                    <th>Score</th>\
                </tr>\
            </thead>\
            <tbody data-bind='foreach: itemsOnCurrentPage'>\
                <tr data-bind='css:{listSelection:$root.selected() == $data}'>\
                    <td data-bind='text: riskNumber'></td>\
                    <td data-bind='text: description'></td>\
                    <td data-bind='text: score, css: rag'></td>\
                </tr>\
            </tbody>\
        </table>");

    templateEngine.addTemplate("assumptionListTemplate", "<table id='assumptionTable' class='table table-bordered table-condensed table-striped'>\
            <thead>\
                <tr>\
                    <th>#</th>\
                    <th>Description</th>\
                    <th>Status</th>\
                </tr>\
            </thead>\
            <tbody data-bind='foreach: itemsOnCurrentPage'>\
                <tr data-bind='css:{listSelection:$root.selected() == $data}'>\
                    <td data-bind='text: assumptionNumber'></td>\
                    <td data-bind='text: description'></td>\
                    <td data-bind='text: status'></td>\
                </tr>\
            </tbody>\
        </table>");


    // The "simpleGrid" binding
    ko.bindingHandlers.simpleGrid = {
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
            var gridTemplateName = allBindings.pagedGridTemplate || "ko_simpleGrid_grid",
                pageLinksTemplateName = allBindings.pagedGridPagerTemplate || "ko_simpleGrid_pageLinks";

            // Render the main grid
            var gridContainer = element.appendChild(document.createElement("DIV"));
            ko.renderTemplate(gridTemplateName, viewModel, { templateEngine: templateEngine }, gridContainer, "replaceNode");

            // Render the page links
            var pageLinksContainer = element.appendChild(document.createElement("DIV"));
            ko.renderTemplate(pageLinksTemplateName, viewModel, { templateEngine: templateEngine }, pageLinksContainer, "replaceNode");
        }
    };
})();