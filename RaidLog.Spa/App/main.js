requirejs.config({
    paths: {
        'text': '../Scripts/text',
        'durandal': '../Scripts/durandal',
        'plugins': '../Scripts/durandal/plugins',
        'transitions': '../Scripts/durandal/transitions'
    }
});

define('jquery', [], function () { return jQuery; });
define('knockout', [], function () { return ko; });
define('moment', [], function () { return moment; });
define('toastr', [], function () { return toastr; });

define(['durandal/system', 'durandal/app', 'durandal/viewLocator'],  function (system, app, viewLocator) {
    //>>excludeStart("build", true);
    system.debug(true);
    //>>excludeEnd("build");

    app.title = 'RAID Logs';

    app.configurePlugins({
        router: true,
        dialog: true,
        widget: true,
        http:   true
    });


    ko.validation.init({ decorateElement: false, insertMessages: false, messagesOnModified: false });

    app.start().then(function() {
        //Replace 'viewmodels' in the moduleId with 'views' to locate the view.
        //Look for partial views in a 'views' folder in the root.
        viewLocator.useConvention();

        //Show the app by setting the root view model for our application with a transition.
        app.setRoot('viewmodels/shell', 'entrance');
    });
});