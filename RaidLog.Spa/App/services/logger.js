/// <reference path="../../Scripts/typings/toastr/toastr.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.amd.d.ts" />
/// <reference path="../../Scripts/typings/durandal/durandal.d.ts" />
define(["require", "exports", "durandal/system"], function(require, exports, __system__) {
    var system = __system__;

    function logIt(message, data, source, showToast, toastType) {
        source = source ? '[' + source + '] ' : '';
        if (data) {
            system.log(source, message, data);
        } else {
            system.log(source, message);
        }
        if (showToast) {
            switch (toastType) {
                case 'error':
                    toastr.error(message);
                    break;
                case 'success':
                    toastr.success(message);
                    break;
                case 'warn':
                    toastr.warning(message);
                    break;
                default:
                    toastr.info(message);
            }
        }
    }

    function log(message, data, source, showToast) {
        logIt(message, data, source, showToast, 'info');
    }
    exports.log = log;

    function logError(message, data, source, showToast) {
        logIt(message, data, source, showToast, 'error');
    }
    exports.logError = logError;

    function logSuccess(message, data, source, showToast) {
        logIt(message, data, source, showToast, 'success');
    }
    exports.logSuccess = logSuccess;

    function logWarning(message, data, source, showToast) {
        logIt(message, data, source, showToast, 'warning');
    }
    exports.logWarning = logWarning;
});
