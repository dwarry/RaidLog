/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.amd.d.ts" />
/// <reference path="../../Scripts/typings/durandal/durandal.d.ts" />

import router = require("durandal/plugins/router");
import ko = require("knockout");

var shell = {
    router: router,
    canSearch: ko.computed(function () {
        return router.activeItem() && 'search' in router.activeItem();
    }),
    searchField: ko.observable(""),
    search: function (formElement:HTMLFormElement) {
        var vm = router.activeItem();
        if (vm && 'search' in vm) {
            vm.search(this.searchField());
        }
    },
    activate: function () {
        debugger;
        router.map([
            { route: '', title: 'Projects', moduleId: 'viewmodels/projectList', nav: true },
        ]);
        

        router.buildNavigationModel();

        return router.activate();
    }
};

export = shell;