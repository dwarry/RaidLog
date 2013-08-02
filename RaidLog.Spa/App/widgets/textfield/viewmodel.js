define(["require", "exports", "durandal/composition"], function(require, exports, __composition__) {
    var composition = __composition__;

    var TextFieldWidget = (function () {
        function TextFieldWidget() {
        }
        TextFieldWidget.prototype.activate = function (settings) {
            this.settings = settings;
        };

        TextFieldWidget.prototype.afterRenderItem = function (elements, item) {
            var parts = composition.getParts(elements);

            var $field = $(parts.field);
        };
        return TextFieldWidget;
    })();
    exports.TextFieldWidget = TextFieldWidget;
});
