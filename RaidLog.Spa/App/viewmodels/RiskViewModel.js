var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "services/dataService", "EditableViewModel"], function(require, exports, __dataService__, __evm__) {
    var dataService = __dataService__;
    
    var evm = __evm__;

    var RiskViewModel = (function (_super) {
        __extends(RiskViewModel, _super);
        function RiskViewModel(item, projectId) {
            var _this = this;
            _super.call(this, item, "Risk");
            this.projectId = projectId;
            this.riskNumber = ko.observable(0);
            this.description = ko.observable("").extend({ required: true, maxLength: 2048 });
            this.raisedDate = ko.observable(moment().local().format("YYYY-MM-DD")).extend({ required: true, dateISO: true });
            this.raisedBy = ko.observable("").extend({ required: true, maxLength: 50 });
            this.rifCategoryId = ko.observable().extend({ required: true });
            this.isProjectRisk = ko.observable(true);
            this.workstream = ko.observable("").extend({ required: true, maxLength: 50 });
            this.commentary = ko.observable("").extend({ required: true, maxLength: 2048 });
            this.approachId = ko.observable(null).extend({ required: true });
            this.impactId = ko.observable(null).extend({ required: true });
            this.likelihoodId = ko.observable(null).extend({ required: true });
            this.owner = ko.observable("").extend({ required: true, maxLength: 50 });
            this.isActive = ko.observable(true);

            this.isNewItem = ko.computed(function () {
                return _this.id === 0;
            }, this);

            this.validation = ko.validatedObservable([
                this.riskNumber,
                this.description,
                this.raisedDate,
                this.raisedBy,
                this.rifCategoryId,
                this.isProjectRisk,
                this.workstream,
                this.commentary,
                this.approachId,
                this.impactId,
                this.likelihoodId,
                this.owner,
                this.isActive
            ]);

            this.canSave = ko.computed(function () {
                return _this.validation.isValid();
            }, this);
        }
        RiskViewModel.prototype.doSaveItem = function () {
            var _this = this;
            var dto = {
                description: this.description(),
                raisedDate: this.raisedDate(),
                raisedBy: this.raisedBy(),
                rifCategoryId: this.rifCategoryId(),
                isProjectRisk: this.isProjectRisk(),
                workstream: this.workstream(),
                commentary: this.commentary(),
                approachId: this.approachId(),
                impactId: this.impactId(),
                likelihoodId: this.likelihoodId(),
                owner: this.owner()
            };

            if (!this.isNewItem()) {
                dto['id'] = this.id;
                dto['version'] = this.version;
            }

            return dataService.saveRisk(this.projectId, dto).done(function (data) {
                _this.item = data;
                _this.updateFromItem();
            });
        };
        return RiskViewModel;
    })(evm.EditableViewModel);
    exports.RiskViewModel = RiskViewModel;
});
