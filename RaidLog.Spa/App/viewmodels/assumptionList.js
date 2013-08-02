define(["require", "exports", 'services/dataService', './pagedGrid', './assumptionDetails'], function(require, exports, __ds__, __pg__, __AssumptionDetails__) {
    var ds = __ds__;
    var pg = __pg__;
    var AssumptionDetails = __AssumptionDetails__;

    var AssumptionList = (function () {
        function AssumptionList() {
            var _this = this;
            this.projectCode = ko.observable("");
            this.projectName = ko.observable("");
            this.listViewModel = new pg.ListViewModel({
                data: ko.observableArray([])
            });

            this._mappingOptions = {
                create: function (options) {
                    return new AssumptionDetails(_this.projectId, options.data);
                },
                key: function (x) {
                    return x.id;
                }
            };
        }
        AssumptionList.prototype.activate = function (projectIdParam) {
            var _this = this;
            this.projectId = projectIdParam;

            var getProject = ds.getProject(this.projectId).done(function (data) {
                _this.projectCode(data.code);
                _this.projectName(data.name);
            });

            this.refresh();
        };

        AssumptionList.prototype.refresh = function () {
            var _this = this;
            ds.getProjectAssumptions(this.projectId).done(function (data) {
                ko.mapping.fromJS(data, _this._mappingOptions, _this.listViewModel.allData);
            });
        };

        AssumptionList.prototype.newAssumption = function () {
            this.listViewModel.selected(ko.mapping.fromJS(ds.makeNewAssumption(), this._mappingOptions));
        };
        return AssumptionList;
    })();

    
    return AssumptionList;
});
