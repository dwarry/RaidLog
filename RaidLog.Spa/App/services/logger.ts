/// <reference path="../../Scripts/typings/toastr/toastr.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.amd.d.ts" />
/// <reference path="../../Scripts/typings/durandal/durandal.d.ts" />

import system = require("durandal/system");

interface Logger{
     log: (message: string, data?: any, source?: string, showToast?: boolean) => void;
     logError: (message: string, data?: any, source?: string, showToast?: boolean) => void;
     logSuccess: (message: string, data?: any, source?: string, showToast?: boolean) => void;
     logWarning: (message: string, data?: any, source?: string, showToast?: boolean) => void;
}

declare var toastr: Toastr;

 
function logIt(message: string, data: any, source: string, showToast: boolean, toastType: string): void {
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


export function log(message: string, data: any, source: string, showToast: boolean): void {
    logIt(message, data, source, showToast, 'info');
}

export function logError(message: string, data: any, source: string, showToast: boolean): void {
    logIt(message, data, source, showToast, 'error');
}

export function logSuccess(message: string, data: any, source: string, showToast: boolean): void {
    logIt(message, data, source, showToast, 'success');
}

export function logWarning(message: string, data: any, source: string, showToast: boolean): void {
    logIt(message, data, source, showToast, 'warning');
}
