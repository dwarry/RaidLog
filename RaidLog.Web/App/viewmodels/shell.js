define(["require", "exports", "durandal/plugins/router", "knockout"], function(require, exports, __router__, __ko__) {
    var router = __router__;
    var ko = __ko__;

    var shell = {
        router: router,
        canSearch: ko.computed(function () {
            return router.activeItem() && 'search' in router.activeItem();
        }),
        searchField: ko.observable(""),
        search: function (formElement) {
            var vm = router.activeItem();
            if (vm && 'search' in vm) {
                vm.search(this.searchField());
            }
        },
        activate: function () {
            debugger;
            router.map([
                { route: '', title: 'Projects', moduleId: 'viewmodels/projectList', nav: true }
            ]);

            router.buildNavigationModel();

            return router.activate();
        }
    };

    
    return shell;
});
