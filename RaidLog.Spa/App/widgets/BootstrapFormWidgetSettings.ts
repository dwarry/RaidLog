/// <reference path="../../Scripts/typings/durandal/durandal.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
/// <reference path="../../Scripts/typings/knockout.validation/knockout.validation.d.ts" />

export interface BootstrapTextWidgetSettings {

    label: string;
    field: KnockoutObservableBase;
    fieldName: string;
    enabled?: any;
    visible?: any;
    fieldClass?: string;
    labelClass?: string;
}

export interface BootstrapSelectWidgetSettings {
    label: string;
    field: KnockoutObservableBase;
    fieldName: string;
    options: any;
    optionsText: string;
    optionsValue: string;
    optionsCaption: string;
    enabled?: any;
    visible?: any;
    fieldClass?: string;
    labelClass?: string;
}

//export function noop() { }