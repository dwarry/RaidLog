define(["require", "exports", "durandal/composition"], function(require, exports, __composition__) {
    var composition = __composition__;

    var TextFieldWidget = (function () {
        function TextFieldWidget() {
            debugger;
        }
        TextFieldWidget.prototype.activate = function (settings) {
            debugger;
            this.settings = settings;
        };

        TextFieldWidget.prototype.afterRenderItem = function (elements, item) {
            var parts = composition.getParts(elements);

            var $field = $(parts.field);
        };
        return TextFieldWidget;
    })();

    
    return TextFieldWidget;
});
