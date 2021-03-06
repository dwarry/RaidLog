﻿/// <reference path="../../Scripts/typings/durandal/durandal.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/knockout.validation/knockout.validation.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
define(["require", "exports", "./riskDetails", "services/dataService", "./pagedGrid"], function(require, exports, __rvm__, __dataService__, __pg__) {
    
    var rvm = __rvm__;
    var dataService = __dataService__;
    
    var pg = __pg__;

    var riskList = (function () {
        function riskList() {
            var _this = this;
            this.projectCode = ko.observable("");
            this.projectName = ko.observable("");
            this.hideClosedItems = ko.observable(true);
            this.risks = ko.observableArray([]);
            this.approaches = ko.observableArray();
            this.impacts = ko.observableArray();
            this.likelihoods = ko.observableArray();
            this.rifCategories = ko.observableArray();
            var listConfig = { data: this.risks, pageSize: 12 };

            this._mappingOptions = {
                key: function (data) {
                    return data.id;
                },
                create: function (options) {
                    return new rvm(options.data, _this.projectId, function (newItem) {
                        _this.listViewModel.allData.push(newItem);
                    });
                }
            };

            this.listViewModel = new pg.ListViewModel(listConfig);

            this.listViewModel.filteredData = ko.computed(function () {
                var sf = _this.listViewModel.searchField().trim();

                if (!_this.listViewModel.searchPredicate || sf.length === 0) {
                    return ko.unwrap(_this.listViewModel.allData);
                }

                var result = ko.utils.arrayFilter(ko.unwrap(_this.listViewModel.allData), function (x) {
                    return (_this.hideClosedItems() && !x.isActive()) ? false : _this.listViewModel.searchPredicate(sf, x);
                });

                return result;
            }, this);

            this.listViewModel.searchPredicate = function (s, item) {
                var desc = item.description();
                return desc && desc.indexOf(s) !== -1;
            };
        }
        riskList.prototype.search = function (s) {
            this.listViewModel.searchField(s);
        };

        riskList.prototype.activate = function (projectIdParam) {
            var _this = this;
            this.projectId = projectIdParam;

            var getRefData = dataService.getReferenceData().done(function (data) {
                _this.approaches(data.approaches);
                _this.impacts(data.impacts);
                _this.likelihoods(data.likelihoods);
                _this.rifCategories(data.rifCategories);
            });

            var getProject = dataService.getProject(this.projectId).done(function (data) {
                _this.projectId = data.id;
                _this.projectCode(data.code);
                _this.projectName(data.name);
            });

            var getRisks = this.refresh();

            return $.when([getRefData, getProject, getRisks]);
        };

        riskList.prototype.refresh = function () {
            var _this = this;
            return dataService.getProjectRisks(this.projectId).done(function (data) {
                ko.mapping.fromJS(data, _this._mappingOptions, _this.risks);
            });
        };

        riskList.prototype.newRisk = function () {
            this.listViewModel.selected(ko.mapping.fromJS(dataService.makeRiskDto(), this._mappingOptions));
        };
        return riskList;
    })();

    
    return riskList;
});
