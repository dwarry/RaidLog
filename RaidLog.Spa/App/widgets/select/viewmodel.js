define(["require", "exports"], function(require, exports) {
    
    

    var SelectWidget = (function () {
        function SelectWidget() {
        }
        SelectWidget.prototype.activate = function (settings) {
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
                (settings).view = 'view_noErrors';
            }
        };
        return SelectWidget;
    })();

    
    return SelectWidget;
});
