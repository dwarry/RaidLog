/// <reference path="../../Scripts/typings/durandal/durandal.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/knockout.validation/knockout.validation.d.ts" />
// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
define(["require", "exports", "services/logger"], function(require, exports, __logger__) {
    
    var logger = __logger__;

    var EditableViewModel = (function () {
        /**
        * @param item The item ()
        */
        function EditableViewModel(item, itemName, isNewItem, savedNewItemCallback) {
            var _this = this;
            this.itemName = itemName;
            this.savedNewItemCallback = savedNewItemCallback;
            this.item = item;

            this.isNewItem = ko.computed(isNewItem || function () {
                return _this.item === null;
            }, this);
        }
        EditableViewModel.prototype.activate = function () {
            this.updateFromItem();
        };

        EditableViewModel.prototype.doSaveItem = function () {
            logger.logWarning("dummy doSaveItem invoked", this, "viewmodels/EditableViewModel", false);

            var dfd = $.Deferred();
            dfd.resolve(null);
            return dfd.promise();
        };

        EditableViewModel.prototype.saveItem = function () {
            var _this = this;
            var wasNew = this.isNewItem();

            return this.doSaveItem().done(function (item, status, jqxhr) {
                _this.item = item;

                if (wasNew && _this.savedNewItemCallback) {
                    _this.savedNewItemCallback();
                }
            });
        };

        EditableViewModel.prototype.updateFromItem = function () {
            var _this = this;
            var it = this.item;
            $.each(it, function (key, value) {
                if (key in _this && _this.hasOwnProperty(key)) {
                    if (ko.isObservable(_this[key])) {
                        _this[key](value);
                    } else {
                        _this[key] = value;
                    }
                }
            });
        };
        return EditableViewModel;
    })();
    exports.EditableViewModel = EditableViewModel;
});
