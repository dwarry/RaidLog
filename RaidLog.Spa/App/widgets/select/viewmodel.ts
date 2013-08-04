/// <reference path="../../../Scripts/typings/durandal/durandal.d.ts" />
/// <reference path="../../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../../Scripts/typings/knockout/knockout.d.ts" />
/// <reference path="../../../Scripts/typings/knockout.validation/knockout.validation.d.ts" />
import widgetSettings = require("widgets/BootstrapFormWidgetSettings");
import composition = require("durandal/composition");

class SelectWidget {
    settings: widgetSettings.BootstrapSelectWidgetSettings;

    constructor() {
    }

    activate(settings: widgetSettings.BootstrapSelectWidgetSettings) {
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

        if (!('isValid' in settings.field)) {
            debugger;
            (<any>settings).view = 'view_noErrors';
        }
    }

}

export = SelectWidget;