/// <reference path='../../Scripts/typings/requirejs/require.d.ts' />
/// <reference path='../../Scripts/typings/toastr/toastr.d.ts' />

define(['durandal/system'],
    function (system) {
        var logger = {
            log: log,
            logError: logError
        };

        return logger;

        function log(message:string, data:any, source:string, showToast:boolean):void {
            logIt(message, data, source, showToast, 'info');
        }

        function logError(message:string, data:any, source:string, showToast:boolean):void {
            logIt(message, data, source, showToast, 'error');
        }

        function logIt(message:string, data:any, source:string, showToast:boolean, toastType:string):void {
            source = source ? '[' + source + '] ' : '';
            if (data) {
                system.log(source, message, data);
            } else {
                system.log(source, message);
            }
            if (showToast) {
                if (toastType === 'error') {
                    toastr.error(message);
                } else {
                    toastr.info(message);
                }

            }

        }
    });