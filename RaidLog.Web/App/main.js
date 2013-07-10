requirejs.config({
    paths: {
        'text': '../Scripts/text',
        'durandal': '../Scripts/durandal',
        'plugins': '../Scripts/durandal/plugins',
        'transitions': '../Scripts/durandal/transitions',
        'knockout': '../Scripts/knockout-2.2.1',
        'bootstrap': '../Scripts/bootstrap',
        'jquery': '../Scripts/jquery-2.0.2',
        'moment': '../Scripts/moment',
        'toastr': '../Scripts/toastr'
    },
    shim: {
        'bootstrap': {
            deps: ['jquery'],
            exports: 'jQuery'
        }
    }
});

define(['durandal/system', 'durandal/app', 'durandal/viewLocator'], function (system, app, viewLocator) {
    //>>excludeStart("build", true);
    system.debug(true);
    //>>excludeEnd("build");

    app.title = 'RAID Logs';

    //specify which plugins to install and their configuration
    app.configurePlugins({
        router: true,
        dialog: true,
        http: true
//        widget: {
//            kinds: []
//        }
    });

    app.start().then(function () {
        //Replace 'viewmodels' in the moduleId with 'views' to locate the view.
        //Look for partial views in a 'views' folder in the root.
        viewLocator.useConvention();

        //Show the app by setting the root view model for our application.
        app.setRoot('viewmodels/shell');
    });
});