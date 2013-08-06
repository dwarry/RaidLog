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

define(['durandal/system', 'durandal/app', 'durandal/viewLocator', 'plugins/widget'],  function (system, app, viewLocator, widget) {
    //>>excludeStart("build", true);
    system.debug(true);
    //>>excludeEnd("build");

    app.title = 'RAID Logs';

    app.configurePlugins({
        router: true,
        dialog: true,
        widget: {kinds:['textarea','textfield','select']},
        http:   true
    });

    toastr.options = {
        "debug": false,
        "positionClass": "toast-bottom-right",
        "onclick": null,
        "fadeIn": 300,
        "fadeOut": 1000,
        "timeOut": 5000,
        "extendedTimeOut": 1000,
        "tapToDismiss": true
    };

    ko.validation.init({ messagesOnModified: false, errorClass: 'error' });
    
   

    app.start().then(function() {
        //Replace 'viewmodels' in the moduleId with 'views' to locate the view.
        //Look for partial views in a 'views' folder in the root.
        viewLocator.useConvention();

        //Show the app by setting the root view model for our application with a transition.
        app.setRoot('viewmodels/shell', 'entrance');
    });
});