﻿/// <reference path="../../Scripts/typings/durandal/durandal.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />y
/// <reference path="../../Scripts/typings/knockout.validation/knockout.validation.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
define(["require", "exports", 'services/dataService'], function(require, exports, __ds__) {
    var ds = __ds__;

    var _assumptionStatuses = ko.observableArray();

    ds.getReferenceData().done(function (refData) {
        _assumptionStatuses(refData.assumptionStatuses);
    });

    var AssumptionDetails = (function () {
        function AssumptionDetails(projectId, dto, _newItemCallback) {
            var _this = this;
            this.projectId = projectId;
            this._newItemCallback = _newItemCallback;
            this.id = 0;
            this.version = "";
            this.assumptionNumber = ko.observable();
            this.description = ko.observable("").extend({ required: true, maxLength: 2048 });
            this.workstream = ko.observable("").extend({ require: true, maxLength: 50 });
            this.owner = ko.observable("").extend({ maxLength: 50 });
            this.validatedBy = ko.observable("").extend({ maxLength: 50 });
            this.statusId = ko.observable(null).extend({ required: true });
            this.supportingDocumentation = ko.observable("").extend({
                maxLength: 512
            });
            this.assumptionStatuses = _assumptionStatuses;
            this.validation = ko.validatedObservable([
                this.description,
                this.workstream,
                this.owner,
                this.validatedBy,
                this.statusId,
                this.supportingDocumentation
            ]);

            this.updateFromDto(dto);

            this.canSave = ko.computed(function () {
                return _this.validation.isValid();
            }, this);

            this.status = ko.computed(function () {
                var result = "(unknown)";
                var stsId = _this.statusId();

                $.each(_this.assumptionStatuses(), function (index, value) {
                    if (value.id === stsId) {
                        result = value.description;
                        return false;
                    } else {
                        return true;
                    }
                });

                return result;
            }, this);

            this.validatedBy.extend({
                required: { onlyIf: function () {
                        return _this._isCurrentStatusFinal();
                    } }
            });

            this.supportingDocumentation.extend({
                required: { onlyIf: function () {
                        return _this._isCurrentStatusFinal();
                    } }
            });
        }
        AssumptionDetails.prototype._isCurrentStatusFinal = function () {
            var result = false;
            var stsId = this.statusId();

            $.each(this.assumptionStatuses(), function (index, value) {
                if (value.id === stsId) {
                    result = value.isFinalState;
                    return false;
                } else {
                    return true;
                }
            });

            return result;
        };

        AssumptionDetails.prototype.updateFromDto = function (dto) {
            this.id = dto.id;
            this.version = dto.version;

            this.assumptionNumber(dto.assumptionNumber);
            this.description(dto.description);
            this.workstream(dto.workstream);
            this.owner(dto.owner);
            this.validatedBy(dto.validatedBy);
            this.statusId(dto.statusId);
            this.supportingDocumentation(dto.supportingDocumentation);
        };

        AssumptionDetails.prototype.save = function () {
            var _this = this;
            var dto = {
                description: this.description(),
                workstream: this.workstream(),
                owner: this.owner(),
                validatedBy: this.validatedBy(),
                statusId: this.statusId(),
                supportingDocumentation: this.supportingDocumentation()
            };

            var newItem = !this.id;

            if (!newItem) {
                var editDto = dto;
                editDto.id = this.id;
                editDto.version = this.version;
                editDto.assumptionNumber = this.assumptionNumber();
                editDto.projectId = this.projectId;
            }

            ds.saveAssumption(this.projectId, dto).done(function (data) {
                _this.updateFromDto(data);
                if (newItem) {
                    _this._newItemCallback(_this);
                }
            });
        };
        return AssumptionDetails;
    })();

    
    return AssumptionDetails;
});
