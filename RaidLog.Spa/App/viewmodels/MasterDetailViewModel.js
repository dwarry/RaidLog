/// <reference path="../../Scripts/typings/durandal/durandal.d.ts" />
/// <reference path="../../Scripts/typings/knockout.validation/knockout.validation.d.ts" />
/// <reference path="../../Scripts/typings/knockout.mapping/knockout.mapping.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../services/dataService.ts" />
/// <reference path="pagedGrid.ts" />
define(["require", "exports", "services/logger", "viewmodels/pagedGrid"], function(require, exports, __logger__, __pg__) {
    
    var logger = __logger__;
    var pg = __pg__;

    var MasterDetailViewModel = (function () {
        function MasterDetailViewModel() {
            // should specify at least the 'key' property
            this.koMappingOptions = {};
            this.listVM = new pg.ListViewModel({ data: ko.observableArray(), pageSize: 20 });
        }
        // override this to actually retrieve the data the VM is going to display.
        MasterDetailViewModel.prototype.doRefresh = function () {
            logger.logWarning("dummy doRefresh invoked", this, "viewmodels/MasterDetailViewModel", false);
            return $.Deferred().resolve(null).promise();
        };

        MasterDetailViewModel.prototype.refresh = function () {
            return this.doRefresh().done(function (results) {
                ko.mapping.fromJS(results, this.koMappingOptions, this.listVM.allData);
            });
        };

        // override this to create a new item.
        MasterDetailViewModel.prototype.doNewItem = function () {
            return null;
        };

        MasterDetailViewModel.prototype.newItem = function () {
            this.listVM.selected(this.doNewItem());
        };

        // override this to do whatever is required to add the new item
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
            // should specify at least the 'key' property
            this.koMappingOptions = {};
            this.koMappingOptions.create = vm;

            this.listVM = new pg.ListViewModel({ data: ko.observableArray(), pageSize: 20 });
        }
        // override this to actually retrieve the data the VM is going to display.
        MasterDetailViewModel2.prototype.doRefresh = function () {
            logger.logWarning("dummy doRefresh invoked", this, "viewmodels/MasterDetailViewModel", false);
            return $.Deferred().resolve(null).promise();
        };

        MasterDetailViewModel2.prototype.refresh = function () {
            this.doRefresh().done(function (results) {
                ko.mapping.fromJS(results, this.koMappingOptions, this.listVM.allData);
            });
        };

        // override this to create a new item.
        MasterDetailViewModel2.prototype.doNewItem = function () {
            return null;
        };

        MasterDetailViewModel2.prototype.newItem = function () {
            var newVm = ko.mapping.fromJS(this.doNewItem(), this.koMappingOptions, null);

            this.listVM.selected(newVm);
        };

        // override this to do whatever is required to add the new item
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
