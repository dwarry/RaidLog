/// <reference path="../../../Scripts/typings/durandal/durandal.d.ts" />
/// <reference path="../../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../../Scripts/typings/knockout/knockout.d.ts" />
/// <reference path="../../../Scripts/typings/knockout.validation/knockout.validation.d.ts" />

import composition = require("durandal/composition");

//interface TextFieldWidgetSettings {
//    field: KnockoutObservableBase;
//    fieldClass: string;
//    fieldName: string;
//    label: string;
//    labelClass: string;
//}

class TextFieldWidget{
    settings: any;// TextFieldWidgetSettings;

    constructor() {
        debugger;  
    }

    activate(settings){//: TextFieldWidgetSettings) {
        debugger;
        this.settings = settings;
    }

    afterRenderItem(elements, item) { 
        var parts = composition.getParts(elements);

        var $field = $(parts.field);

    }
}

export = TextFieldWidget;