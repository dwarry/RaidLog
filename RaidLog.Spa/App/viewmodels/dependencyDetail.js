/// <reference path="../../Scripts/typings/durandal/durandal.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/knockout.validation/knockout.validation.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
define(["require", "exports", 'plugins/dialog', 'plugins/router', "services/dataService", 'services/routeFactory', './actionDetailsDialog'], function(require, exports, __dlg__, __router__, __ds__, __rf__, __ActionDetailsDialog__) {
    var dlg = __dlg__;
    var router = __router__;
    var ds = __ds__;
    var rf = __rf__;
    var ActionDetailsDialog = __ActionDetailsDialog__;

    var _ragStatuses = ["Green", "Amber", "Red"];

    var _dependencyStatuses = ["Outstanding", "In Progress", "Fulfilled"];

    var DependencyDetail = (function () {
        function DependencyDetail(projectId, dto, _newItemCallback) {
            var _this = this;
            this.projectId = projectId;
            this._newItemCallback = _newItemCallback;
            this.id = ko.observable();
            this.version = null;
            this.dependencyNumber = ko.observable();
            this.status = ko.observable().extend({ required: true, maxLength: 16 });
            this.statuses = _dependencyStatuses;
            this.workstream = ko.observable().extend({ required: true, maxLength: 50 });
            this.description = ko.observable().extend({ required: true, maxLength: 2048 });
            this.plannedDate = ko.observable().extend({ required: true, dateISO: true });
            this.requiredByDate = ko.observable().extend({ required: true, dateISO: true });
            this.comments = ko.observable().extend({ maxLength: 2048 });
            this.ragStatus = ko.observable().extend({ required: true });
            this.ragStatuses = _ragStatuses;
            this.ragClass = ko.computed(function () {
                return "rag" + _this.ragStatus();
            }, this);
            this.dependencyLevel = ko.observable().extend({ required: true, maxLength: 50 });
            this.canSave = ko.computed(function () {
                return _this.validation.isValid();
            }, this);
            this.isNew = ko.computed(function () {
                return !_this.id();
            }, this);
            this.validation = ko.validatedObservable([
                this.status,
                this.workstream,
                this.description,
                this.plannedDate,
                this.requiredByDate,
                this.comments,
                this.ragStatus,
                this.dependencyLevel
            ]);

            this.updateFromDto(dto);
        }
        DependencyDetail.prototype.updateFromDto = function (dto) {
            this.id(dto.id);
            this.version = dto.version;
            this.projectId = dto.projectId;
            this.dependencyNumber(dto.dependencyNumber);
            this.status(dto.status);
            this.workstream(dto.workstream);
            this.description(dto.description);
            this.plannedDate((dto.plannedDate || "").substring(0, 10));
            this.requiredByDate((dto.requiredByDate || "").substring(0, 10));
            this.comments(dto.comments);
            this.ragStatus(dto.ragStatus);
            this.dependencyLevel(dto.dependencyLevel);
        };

        DependencyDetail.prototype.save = function () {
            var _this = this;
            var dto;
            dto = {
                status: this.status(),
                workstream: this.workstream(),
                description: this.description(),
                plannedDate: this.plannedDate(),
                requiredByDate: this.requiredByDate(),
                comments: this.comments(),
                ragStatus: this.ragStatus(),
                dependencyLevel: this.dependencyLevel()
            };

            if (this.isNew()) {
                var newItem = dto;
                newItem.projectId = this.projectId;
            } else {
                var editItem = dto;
                editItem.id = this.id();
                editItem.version = this.version;
            }

            ds.saveDependency(dto).done(function (data) {
                _this.updateFromDto(data);
                if (newItem) {
                    _this._newItemCallback(_this);
                }
            });
            ;
        };

        DependencyDetail.prototype.addAction = function () {
            var action = ds.makeActionDto();
            action.parentItemType = "Dependency";
            action.parentItemId = this.id();

            var ad = new ActionDetailsDialog(action);

            dlg.show(ad);
        };

        DependencyDetail.prototype.showActions = function () {
            var route = rf.makeItemActionLink('dependency', this.id());

            router.navigate(route);
        };
        return DependencyDetail;
    })();

    
    return DependencyDetail;
});
