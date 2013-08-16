/// <reference path="../../Scripts/typings/requirejs/require.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.amd.d.ts" />
/// <reference path="../../Scripts/typings/durandal/durandal.d.ts" />
define(["require", "exports", "plugins/router", "knockout", "services/routeFactory"], function(require, exports, __router__, __ko__, __routeFactory__) {
    var router = __router__;
    var ko = __ko__;
    var routeFactory = __routeFactory__;
    

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
            return routeFactory.initializeRouter();
        }
    };

    
    return shell;
});
