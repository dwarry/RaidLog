define(["require", "exports", "durandal/plugins/router", "durandal/app"], function(require, exports, __router__, __app__) {
    var router = __router__;
    var app = __app__;

    var shell = {
        router: router,
        search: function () {
            app.showMessage("Search not implemented yet");
        },
        activate: function () {
            router.map([
                { url: '', title: 'Projects', moduleId: 'viewmodels/projectList', nav: true }
            ]);
        }
    };

    
    return shell;
});
