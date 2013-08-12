/// <reference path="../../Scripts/typings/durandal/durandal.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />y
/// <reference path="../../Scripts/typings/knockout.validation/knockout.validation.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
define(["require", "exports"], function(require, exports) {
    
    
    

    var ActionList = (function () {
        function ActionList() {
            this.title = ko.observable("");
            this.listViewModel = new pg.ListViewModel({ data: ko.observableArray([]) });

            var newItemCallback = function (item) {
                _this.listViewModel.allData.push(item);
            };

            this._mappingOptions = {
                create: function (options) {
                    return new ActionDetails(options.data, newItemCallback);
                },
                key: function (x) {
                    return x.id;
                }
            };

            this.canAdd = ko.computed(function () {
                return _this.itemType !== 'Project';
            }, this);
        }
        ActionList.prototype.activate = function (itemTypeParam, itemIdParam) {
            this.itemType = singularize(itemTypeParam);
            this.itemId = itemIdParam;
        };

        ActionList.prototype.singularize = function (plural) {
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
        };

        ActionList.prototype.refresh = function () {
            if (this.itemType == "Project") {
                if (this.title() === "") {
                    ds.getProject(this.itemId).done(function (proj) {
                        _this.title("Actions for " + proj.description);
                    });
                }

                ds.getProjectActions(this.itemId).done(function (data) {
                    ko.mapping.fromJS(data, _this._mappingOptions, _this.listViewModel.allData);
                });
            } else {
                this.title(this.itemType + " Actions");

                ds.getActionsFor(this.itemType, this.itemId).done(function (data) {
                    ko.mapping.fromJS(data, _this._mappingOptions, _this.listViewModel.allData);
                });
            }
        };
        return ActionList;
    })();

    
    return ActionList;
});
