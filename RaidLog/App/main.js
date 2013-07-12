﻿requirejs.config({
    paths: {
        'text': 'durandal/amd/text'
    }
});

define(['durandal/app', 'durandal/viewLocator', 'durandal/system', 'durandal/plugins/router', 'config'],
    function(app, viewLocator, system, router, config) {

        //>>excludeStart("build", true);
        system.debug(true);
        //>>excludeEnd("build");

        app.title = 'Project RAID Logs';
        app.start().then(function() {
            //Replace 'viewmodels' in the moduleId with 'views' to locate the view.
            //Look for partial views in a 'views' folder in the root.
            viewLocator.useConvention();


            ko.validation.init({ decorateElement: true, errorElementClass: 'error', insertMessages: false, messagesOnModified: false });
            //configure routing
            setupRouter();
            
            app.adaptToDevice();

            //Show the app by setting the root view model for our application with a transition.
            app.setRoot('viewmodels/shell', 'entrance');
        });

        function setupRouter() {
            router.useConvention();

            router.map(config.routes);
        }
    });