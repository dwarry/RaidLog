/// <reference path="../../../Scripts/typings/durandal/durandal.d.ts" />
/// <reference path="../../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../../Scripts/typings/knockout/knockout.d.ts" />
/// <reference path="../../../Scripts/typings/knockout.validation/knockout.validation.d.ts" />
import widgetSettings = require("widgets/BootstrapFormWidgetSettings");
import composition = require("durandal/composition");

class TextFieldWidget{
    settings: widgetSettings.BootstrapTextWidgetSettings;

    constructor() {
    }

    activate(settings: widgetSettings.BootstrapTextWidgetSettings) {
        this.settings = settings;

        if (!('enabled' in settings)) {
            settings.enabled = true;
        }

        if (!('visible' in settings)) {
            settings.visible = true;
        }

        if (!('fieldClass' in settings)) {
            settings.fieldClass = "";
        }

        if (!('labelClass' in settings)) {
            settings.labelClass = "";
        }

        if (typeof(settings.field) !== 'number' &&
            'isValid' in settings.field) {
            settings['isValid'] = settings.field.isValid;
        }
        else {
            settings['isValid'] = () => true;
        }
    }
}

export = TextFieldWidget;