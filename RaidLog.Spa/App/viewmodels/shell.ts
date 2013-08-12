/// <reference path="../../Scripts/typings/requirejs/require.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.amd.d.ts" />
/// <reference path="../../Scripts/typings/durandal/durandal.d.ts" />

import router = require("plugins/router");
import ko = require("knockout");
import routeFactory = require("services/routeFactory");
import ts = require("durandal/typescript");

var shell = {
    router: router,
    canSearch: ko.computed(function () {
        return router.activeItem() && 'search' in router.activeItem();
    }),
    searchField: ko.observable(""),
    search: function (formElement: HTMLFormElement) {
        var vm = router.activeItem();
        if (vm && 'search' in vm) {
            vm.search(this.searchField());
        }
    },
    activate: function () {
        return routeFactory.initializeRouter();
    }
};

export = shell;