define(["require", "exports", "./RiskViewModel", "services/dataService", "./pagedGrid"], function(require, exports, __rvm__, __dataService__, __pg__) {
    
    var rvm = __rvm__;
    var dataService = __dataService__;
    
    var pg = __pg__;

    var RiskListViewModel = (function () {
        function RiskListViewModel() {
            var _this = this;
            this.projectCode = ko.observable("");
            this.projectName = ko.observable("");
            this.activeItems = ko.observable(true);
            this.risks = ko.observableArray();
            this.approaches = ko.observableArray();
            this.impacts = ko.observableArray();
            this.likelihoods = ko.observableArray();
            this.rifCategories = ko.observableArray();
            var listConfig = { data: this.risks };

            this._mappingOptions = {
                key: function (data) {
                    return data.id;
                },
                create: function (options) {
                    return new rvm.RiskViewModel(options.data, function (newItem) {
                        _this.listViewModel.allData.push(newItem);
                    });
                }
            };

            this.listViewModel = new pg.ListViewModel(listConfig);

            this.listViewModel.searchPredicate = function (s, item) {
                return item.description.indexOf(s) !== -1;
            };
        }
        RiskListViewModel.prototype.search = function (s) {
            this.listViewModel.searchField(s);
        };

        RiskListViewModel.prototype.activate = function (projectIdParam, activeParam) {
            var _this = this;
            this.projectId = projectIdParam;
            this.activeItems(activeParam);

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

        RiskListViewModel.prototype.refresh = function () {
            var _this = this;
            return dataService.getProjectRisks(this.projectId, this.activeItems()).done(function (data) {
                return ko.mapping.fromJS(_this.risks(data), _this._mappingOptions);
            });
        };
        return RiskListViewModel;
    })();
});
