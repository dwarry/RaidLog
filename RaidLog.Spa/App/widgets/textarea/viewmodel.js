define(["require", "exports"], function(require, exports) {
    
    

    var TextAreaWidget = (function () {
        function TextAreaWidget() {
        }
        TextAreaWidget.prototype.activate = function (settings) {
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
        };
        return TextAreaWidget;
    })();

    
    return TextAreaWidget;
});
