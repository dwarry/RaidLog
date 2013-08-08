/// <reference path="../../Scripts/typings/durandal/durandal.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/knockout.validation/knockout.validation.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
define(["require", "exports", 'services/dataService'], function(require, exports, __ds__) {
    var ds = __ds__;
    

    var IssueDetails = (function () {
        function IssueDetails(_projectId, dto, _newItemCallback) {
            var _this = this;
            this._projectId = _projectId;
            this._newItemCallback = _newItemCallback;
            this.id = ko.observable(0);
            this.version = ko.observable("");
            this.raisedDate = ko.observable(moment().local().format("YYYY-MM-DD")).extend({ required: true, dateISO: true });
            this.raisedBy = ko.observable("").extend({ required: true, maxLength: 50 });
            this.issueNumber = ko.observable();
            this.description = ko.observable("").extend({ required: true, maxLength: 2048 });
            this.workstream = ko.observable("").extend({ required: true, maxLength: 50 });
            this.owner = ko.observable("").extend({ maxLength: 50 });
            this.commentary = ko.observable("").extend({ maxLength: 2048 });
            this.resolvedDate = ko.observable("").extend({ dateISO: true });
            this.resolvedBy = ko.observable("");
            this.resolutionDescription = ko.observable("").extend({ maxLength: 512 });
            this.isResolved = ko.computed(function () {
                var dt = _this.resolvedDate();
                return dt != null && dt.length > 0;
            }, this);

            this.isNew = ko.computed(function () {
                return !_this.id();
            }, this);

            this.resolvedBy.extend({ required: { onlyIf: this.isResolved }, maxLength: 50 });

            this.resolutionDescription.extend({ required: { onlyIf: this.isResolved }, maxLength: 512 });

            this.validation = ko.validatedObservable([
                this.raisedDate,
                this.raisedBy,
                this.description,
                this.workstream,
                this.owner,
                this.commentary,
                this.resolvedDate,
                this.resolvedBy,
                this.resolutionDescription
            ]);

            this.updateFromDto(dto);
        }
        IssueDetails.prototype.updateFromDto = function (dto) {
            this.id(dto.id);
            this.version(dto.version);
            this.issueNumber(dto.issueNumber);
            this.description(dto.description);
            this.workstream(dto.workstream);
            this.owner(dto.owner);
            this.commentary(dto.commentary);
            this.raisedDate(dto.raisedDate);
            this.raisedBy(dto.raisedBy);
            this.resolvedDate(dto.resolvedDate);
            this.resolvedBy(dto.resolvedBy);
            this.resolutionDescription(dto.resolutionDescription);
        };

        IssueDetails.prototype.save = function () {
            var _this = this;
            var isNewItem = this.id() === 0;

            var dto = {
                description: this.description(),
                workstream: this.workstream(),
                owner: this.owner(),
                commentary: this.commentary()
            };

            if (isNewItem) {
                dto.raisedDate = this.raisedDate();
                dto.raisedBy = this.raisedBy();
            } else {
                dto.id = this.id();
                dto.version = this.version();
                dto.resolvedDate = this.resolvedDate();
                dto.resolvedBy = this.resolvedBy();
                dto.resolutionDescription = this.resolutionDescription();
            }

            ds.saveIssue(this._projectId, dto).done(function (data) {
                _this.updateFromDto(data);
                if (isNewItem) {
                    _this._newItemCallback(_this);
                }
            });
        };
        return IssueDetails;
    })();

    
    return IssueDetails;
});
