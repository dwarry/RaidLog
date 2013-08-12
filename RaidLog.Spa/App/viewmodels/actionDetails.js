/// <reference path="../../Scripts/typings/durandal/durandal.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />y
/// <reference path="../../Scripts/typings/knockout.validation/knockout.validation.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
define(["require", "exports", 'services/dataService'], function(require, exports, __ds__) {
    var ds = __ds__;

    var _actionStatuses = ko.observableArray();

    ds.getReferenceData().done(function (refData) {
        _actionStatuses(refData.actionStatuses);
    });

    var _parentItemTypes = ["Risk", "Assumption", "Issue", "Dependency", "Query"];

    var ActionDetails = (function () {
        function ActionDetails(dto, _newItemCallback) {
            var _this = this;
            this._newItemCallback = _newItemCallback;
            this.id = ko.observable();
            this.version = "";
            this.actionNumber = ko.observable();
            this.parentItemType = ko.observable();
            this.parentItemTypes = _parentItemTypes;
            this.parentItemId = ko.observable();
            this.parentItemNumber = ko.observable();
            this.description = ko.observable().extend({ required: true, maxLength: 256 });
            this.actor = ko.observable().extend({ required: true, maxLength: 50 });
            this.actionStatusId = ko.observable().extend({ required: true });
            this.dueDate = ko.observable().extend({ required: true, dateISO: true });
            this.resolvedDate = ko.observable().extend({ required: true, dateISO: true });
            this.resolution = ko.observable().extend({ maxLength: 256 });
            this.actionStatuses = _actionStatuses;
            this.validation = ko.validatedObservable([
                this.description,
                this.actor,
                this.actionStatusId,
                this.dueDate,
                this.resolvedDate,
                this.resolution
            ]);

            this.isNewItem = ko.computed(function () {
                return dto.id === 0;
            });

            this.parent = ko.computed(function () {
                return _this.parentItemType().substring(0, 1) + "_" + _this.parentItemNumber();
            }, this);

            this.updateFromDto(dto);

            this.canSave = ko.computed(function () {
                return _this.validation.isValid();
            }, this);

            this.status = ko.computed(function () {
                var result = "(unknown)";
                var stsId = _this.actionStatusId();

                $.each(_this.actionStatuses(), function (index, value) {
                    if (value.id === stsId) {
                        result = value.description;
                        return false;
                    } else {
                        return true;
                    }
                });

                return result;
            }, this);
        }
        ActionDetails.prototype.updateFromDto = function (dto) {
            this.id(dto.id);
            this.version = dto.version;
            this.actionNumber(dto.actionNumber);
            this.parentItemType(dto.parentItemType);
            this.parentItemId(dto.parentItemId);
            this.description(dto.description);
            this.actor(dto.actor);
            this.actionStatusId(dto.actionStatusId);
            this.dueDate((dto.dueDate || "").substring(0, 10));
            this.resolvedDate((dto.resolvedDate || "").substring(0, 10));
            this.resolution(dto.resolution);
        };

        ActionDetails.prototype.save = function () {
            var _this = this;
            var dto;

            if (this.id() != 0) {
                var editDto = {
                    id: this.id(),
                    version: this.version,
                    description: this.description(),
                    actor: this.actor(),
                    actionStatusId: this.actionStatusId(),
                    dueDate: this.dueDate(),
                    resolvedDate: this.resolvedDate(),
                    resolution: this.resolution()
                };

                dto = editDto;
            } else {
                var newDto = {
                    parentItemType: this.parentItemType(),
                    parentItemId: this.parentItemId(),
                    description: this.description(),
                    actor: this.actor(),
                    actionStatusId: this.actionStatusId(),
                    dueDate: this.dueDate()
                };

                dto = newDto;
            }

            ds.saveAction(dto).done(function (data) {
                _this.updateFromDto(data);
                if (_this.isNewItem() && _this._newItemCallback) {
                    _this._newItemCallback(_this);
                }
            });
        };

        ActionDetails.prototype.showParent = function () {
        };
        return ActionDetails;
    })();

    
    return ActionDetails;
});
