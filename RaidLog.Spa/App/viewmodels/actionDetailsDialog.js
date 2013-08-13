var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "plugins/dialog", "./actionDetails"], function(require, exports, __dlg__, __ActionDetails__) {
    var dlg = __dlg__;

    

    var ActionDetails = __ActionDetails__;

    var ActionDetailsDialog = (function (_super) {
        __extends(ActionDetailsDialog, _super);
        function ActionDetailsDialog(dto) {
            var _this = this;
            _super.call(this, dto, function (item) {
                dlg.close(_this, true);
            });
        }
        ActionDetailsDialog.prototype.cancel = function () {
            dlg.close(this, false);
        };
        return ActionDetailsDialog;
    })(ActionDetails);

    
    return ActionDetailsDialog;
});
