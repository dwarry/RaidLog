/// <reference path="../../Scripts/typings/durandal/durandal.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/knockout.validation/knockout.validation.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
define(["require", "exports", 'services/dataService', './pagedGrid', './issueDetails'], function(require, exports, __ds__, __pg__, __IssueDetails__) {
    var ds = __ds__;
    var pg = __pg__;
    var IssueDetails = __IssueDetails__;

    var IssueList = (function () {
        function IssueList() {
            var _this = this;
            this.listViewModel = new pg.ListViewModel({ data: ko.observableArray([]) });
            this.projectCode = ko.observable("");
            this.projectName = ko.observable("");
            var newItemCallback = function (item) {
                _this.listViewModel.allData.push(item);
            };

            this._mappingOptions = {
                create: function (options) {
                    return new IssueDetails(_this._projectId, options.data, newItemCallback);
                },
                key: function (x) {
                    return x.id;
                }
            };
        }
        IssueList.prototype.activate = function (projectIdParam) {
            var _this = this;
            this._projectId = projectIdParam;

            ds.getProject(this._projectId).done(function (data) {
                _this.projectCode(data.code);
                _this.projectName(data.name);
            });

            return this.refresh();
        };

        IssueList.prototype.refresh = function () {
            var _this = this;
            return ds.getProjectIssues(this._projectId).done(function (data) {
                return ko.mapping.fromJS(data, _this._mappingOptions, _this.listViewModel.allData);
            });
        };

        IssueList.prototype.newIssue = function () {
            this.listViewModel.selected(ko.mapping.fromJS(ds.makeIssueDto(this._projectId), this._mappingOptions));
        };
        return IssueList;
    })();

    
    return IssueList;
});
