define(["require", "exports", 'services/dataService', './pagedGrid', './assumptionDetails'], function(require, exports, __ds__, __pg__, __AssumptionDetails__) {
    var ds = __ds__;
    var pg = __pg__;
    var AssumptionDetails = __AssumptionDetails__;

    var mappingOptions = {
        create: function (options) {
            return new AssumptionDetails(options.parent.projectId, options.data);
        },
        key: function (x) {
            return x.id;
        }
    };

    var AssumptionList = (function () {
        function AssumptionList() {
            this.listViewModel = new pg.ListViewModel({
                data: ko.observableArray([])
            });
        }
        AssumptionList.prototype.activate = function (projectIdParam) {
            this.projectId = projectIdParam;
            this.refresh();
        };

        AssumptionList.prototype.refresh = function () {
            var _this = this;
            ds.getProjectAssumptions(this.projectId).done(function (data) {
                ko.mapping.fromJS(data, mappingOptions, _this.listViewModel.allData);
            });
        };
        return AssumptionList;
    })();

    
    return AssumptionList;
});
