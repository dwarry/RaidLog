/// <reference path="../../Scripts/typings/durandal/durandal.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />y
/// <reference path="../../Scripts/typings/knockout.validation/knockout.validation.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
define(["require", "exports", 'services/dataService'], function(require, exports, __ds__) {
    var ds = __ds__;
    
    

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
            this.itemType = itemTypeParam;
            this.itemId = itemIdParam;
        };

        ActionList.prototype.refresh = function () {
            var _this = this;
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
