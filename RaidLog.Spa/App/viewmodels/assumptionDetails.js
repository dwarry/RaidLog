define(["require", "exports", 'services/dataService'], function(require, exports, __ds__) {
    var ds = __ds__;

    var AssumptionDetails = (function () {
        function AssumptionDetails(projectId, dto) {
            var _this = this;
            this.projectId = projectId;
            this.id = 0;
            this.version = "";
            this.assumptionNumber = 0;
            this.description = ko.observable("").extend({ required: true, maxLength: 2048 });
            this.workstream = ko.observable("").extend({ require: true, maxLength: 50 });
            this.owner = ko.observable("").extend({ maxLength: 50 });
            this.validatedBy = ko.observable("").extend({ maxLength: 50 });
            this.statusId = ko.observable(null).extend({ required: true });
            this.supportingDocumentation = ko.observable("").extend({ maxLength: 512 });
            this.validation = ko.validatedObservable([
                this.description,
                this.workstream,
                this.owner,
                this.validatedBy,
                this.statusId,
                this.supportingDocumentation
            ]);

            this.canSave = ko.computed(function () {
                return _this.validation.isValid();
            }, this);

            this.updateFromDto(dto);
        }
        AssumptionDetails.prototype.updateFromDto = function (dto) {
            this.id = dto.id;
            this.version = dto.version;

            this.assumptionNumber = dto.assumptionNumber;
            this.description(dto.description);
            this.workstream(dto.workstream);
            this.owner(dto.owner);
            this.validatedBy(dto.validatedBy);
            this.statusId(dto.statusId);
            this.supportingDocumentation(dto.supportingDocumentation);
        };

        AssumptionDetails.prototype.save = function () {
            var dto = {
                description: this.description(),
                workstream: this.workstream(),
                owner: this.owner(),
                validatedBy: this.validatedBy(),
                statusId: this.statusId(),
                supportingDocumentation: this.supportingDocumentation()
            };

            if (this.id) {
                var editDto = dto;
                editDto.id = this.id;
                editDto.version = this.version;
                editDto.assumptionNumber = this.assumptionNumber;
                editDto.projectId = this.projectId;
            }

            ds.saveAssumption(this.projectId, dto);
        };
        return AssumptionDetails;
    })();

    
    return AssumptionDetails;
});
