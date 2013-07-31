define(["require", "exports", "services/logger", "viewmodels/pagedGrid"], function(require, exports, __logger__, __pg__) {
    
    var logger = __logger__;
    var pg = __pg__;

    var MasterDetailViewModel = (function () {
        function MasterDetailViewModel() {
            this.koMappingOptions = {};
            this.listVM = new pg.ListViewModel({ data: ko.observableArray(), pageSize: 20 });
        }
        MasterDetailViewModel.prototype.doRefresh = function () {
            logger.logWarning("dummy doRefresh invoked", this, "viewmodels/MasterDetailViewModel", false);
            return $.Deferred().resolve(null).promise();
        };

        MasterDetailViewModel.prototype.refresh = function () {
            return this.doRefresh().done(function (results) {
                ko.mapping.fromJS(results, this.koMappingOptions, this.listVM.allData);
            });
        };

        MasterDetailViewModel.prototype.doNewItem = function () {
            return null;
        };

        MasterDetailViewModel.prototype.newItem = function () {
            this.listVM.selected(this.doNewItem());
        };

        MasterDetailViewModel.prototype.doItemWasAdded = function () {
            if (this.listVM.allData.indexOf(this.listVM.selected()) !== -1) {
                this.listVM.allData.unshift(this.listVM.selected());
            }
        };

        MasterDetailViewModel.prototype.doItemWasRemoved = function (oldItem) {
            this.listVM.allData.remove(oldItem);
        };
        return MasterDetailViewModel;
    })();
    exports.MasterDetailViewModel = MasterDetailViewModel;

    var MasterDetailViewModel2 = (function () {
        function MasterDetailViewModel2(vm) {
            this.koMappingOptions = {};
            this.koMappingOptions.create = vm;

            this.listVM = new pg.ListViewModel({ data: ko.observableArray(), pageSize: 20 });
        }
        MasterDetailViewModel2.prototype.doRefresh = function () {
            logger.logWarning("dummy doRefresh invoked", this, "viewmodels/MasterDetailViewModel", false);
            return $.Deferred().resolve(null).promise();
        };

        MasterDetailViewModel2.prototype.refresh = function () {
            this.doRefresh().done(function (results) {
                ko.mapping.fromJS(results, this.koMappingOptions, this.listVM.allData);
            });
        };

        MasterDetailViewModel2.prototype.doNewItem = function () {
            return null;
        };

        MasterDetailViewModel2.prototype.newItem = function () {
            var newVm = ko.mapping.fromJS(this.doNewItem(), this.koMappingOptions, null);

            this.listVM.selected(newVm);
        };

        MasterDetailViewModel2.prototype.doItemWasAdded = function (newItem) {
            var newVm = ko.mapping.fromJS(this.doNewItem(), this.koMappingOptions, null);

            this.listVM.allData.unshift(newVm);
        };

        MasterDetailViewModel2.prototype.doItemWasRemoved = function (oldItem) {
            this.listVM.allData.remove(oldItem);
        };
        return MasterDetailViewModel2;
    })();
    exports.MasterDetailViewModel2 = MasterDetailViewModel2;
});
