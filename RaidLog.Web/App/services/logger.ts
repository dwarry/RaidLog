/// <reference path="../../Scripts/typings/knockout/knockout.amd.d.ts" />
/// <reference path="../../Scripts/typings/durandal/durandal.d.ts" />
/// <reference path='../../Scripts/typings/requirejs/require.d.ts' />
/// <reference path='../../Scripts/typings/toastr/toastr.d.ts' />
interface Logger{
     log: (message: string, data?: any, source?: string, showToast?: boolean) => void;
     logError: (message: string, data?: any, source?: string, showToast?: boolean) => void;
     
}


//define(['durandal/system'],
//    function (system) {

import system = require("durandal/system");

        function logIt(message: string, data: any, source: string, showToast: boolean, toastType: string): void {
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


    export function log(message: string, data: any, source: string, showToast: boolean): void {
        logIt(message, data, source, showToast, 'info');
    }

    export function logError(message: string, data: any, source: string, showToast: boolean): void {
        logIt(message, data, source, showToast, 'error');
    }

//    });