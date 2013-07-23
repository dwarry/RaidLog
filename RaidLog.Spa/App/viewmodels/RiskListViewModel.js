var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "MasterDetailViewModel", "./RiskViewModel", "services/dataService"], function(require, exports, __md__, __rvm__, __dataService__) {
    var md = __md__;
    var rvm = __rvm__;
    var dataService = __dataService__;
    

    var RiskListViewModel = (function (_super) {
        __extends(RiskListViewModel, _super);
        function RiskListViewModel() {
            _super.call(this);
            this.projectCode = ko.observable("");
            this.projectName = ko.observable("");
            this.activeItems = ko.observable(true);
            this.approaches = ko.observableArray();
            this.impacts = ko.observableArray();
            this.likelihoods = ko.observableArray();
            this.riskViewModel = new rvm.RiskViewModel();

            this.koMappingOptions = {
                key: function (x) {
                    return x.id;
                }
            };
        }
        RiskListViewModel.prototype.activate = function (projectIdParam, activeParam) {
            var _this = this;
            this.projectId = projectIdParam;
            this.activeItems(activeParam);

            var getRefData = dataService.getReferenceData().done(function (data) {
                _this.approaches(data.approaches);
                _this.impacts(data.impacts);
                _this.likelihoods(data.likelihoods);
            });

            var getProject = dataService.getProject(this.projectId).done(function (data) {
                _this.projectId = data.id;
                _this.projectCode(data.code);
                _this.projectName(data.name);
            });

            var getRisks = this.refresh();

            return $.when([getRefData, getProject, getRisks]);
        };

        RiskListViewModel.prototype.doRefresh = function () {
            return dataService.getProjectRisks(this.projectId, this.activeItems());
        };

        RiskListViewModel.prototype.impactScore = function (impactId) {
            var result = 0;

            $.each(this.impacts(), function (i, impact) {
                if (impact.id === impactId) {
                    result = impact.score;
                    return false;
                }
                return true;
            });

            return result;
        };

        RiskListViewModel.prototype.likelihoodScore = function (likelihoodId) {
            var result = 0;

            $.each(this.likelihoods, function (i, likelihood) {
                if (likelihood.id === likelihoodId) {
                    result = likelihood.score;
                    return false;
                }
                return true;
            });

            return result;
        };
        return RiskListViewModel;
    })(md.MasterDetailViewModel);
});
