define(["require", "exports"], function(require, exports) {
    
    

    var TextFieldWidget = (function () {
        function TextFieldWidget() {
        }
        TextFieldWidget.prototype.activate = function (settings) {
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

            if (typeof (settings.field) !== 'number' && 'isValid' in settings.field) {
                settings['isValid'] = settings.field.isValid;
            } else {
                settings['isValid'] = function () {
                    return true;
                };
            }
        };
        return TextFieldWidget;
    })();

    
    return TextFieldWidget;
});
