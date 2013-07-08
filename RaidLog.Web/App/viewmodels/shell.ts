/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.amd.d.ts" />
/// <reference path="../../Scripts/typings/durandal/durandal.d.ts" />

import router = require("durandal/plugins/router");
import app = require("durandal/app");

var shell = {
    router: router,
    search: function () {
        app.showMessage("Search not implemented yet");
    },
    activate: function () {
        router.map([
            {url:'',title:'Projects', moduleId: 'viewmodels/projectList', nav:true},    
        ]);
    }
};

export = shell;