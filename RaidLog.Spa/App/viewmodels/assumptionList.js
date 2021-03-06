﻿/// <reference path="../../Scripts/typings/durandal/durandal.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/knockout.validation/knockout.validation.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
define(["require", "exports", 'services/dataService', './pagedGrid', './assumptionDetails'], function(require, exports, __ds__, __pg__, __AssumptionDetails__) {
    var ds = __ds__;
    var pg = __pg__;
    var AssumptionDetails = __AssumptionDetails__;

    var assumptionStatuses;

    ds.getReferenceData().done(function (data) {
        assumptionStatuses = data.assumptionStatuses;
    });

    var AssumptionList = (function () {
        function AssumptionList() {
            var _this = this;
            this.projectCode = ko.observable("");
            this.projectName = ko.observable("");
            this.listViewModel = new pg.ListViewModel({
                data: ko.observableArray([])
            });

            var newItemCallback = function (item) {
                _this.listViewModel.allData.push(item);
            };

            this._mappingOptions = {
                create: function (options) {
                    return new AssumptionDetails(_this.projectId, options.data, newItemCallback);
                },
                key: function (x) {
                    return x.id;
                }
            };

            this.assumptionStatuses = assumptionStatuses;
        }
        AssumptionList.prototype.activate = function (projectIdParam) {
            var _this = this;
            this.projectId = projectIdParam;

            var getProject = ds.getProject(this.projectId).done(function (data) {
                _this.projectCode(data.code);
                _this.projectName(data.name);
            });

            this.refresh();
        };

        AssumptionList.prototype.refresh = function () {
            var _this = this;
            ds.getProjectAssumptions(this.projectId).done(function (data) {
                ko.mapping.fromJS(data, _this._mappingOptions, _this.listViewModel.allData);
            });
        };

        AssumptionList.prototype.newAssumption = function () {
            this.listViewModel.selected(ko.mapping.fromJS(ds.makeNewAssumption(), this._mappingOptions));
        };
        return AssumptionList;
    })();

    
    return AssumptionList;
});
