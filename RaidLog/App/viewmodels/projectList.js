define(function(require) {

    var backend = require('services/backend'),
        logger = require('services/logger'),
        app = require('durandal/app'),
        addProjectVm = require('viewmodels/newProject');

    var projectList = {
        'projects': ko.observableArray([]),

        'selectedProject': ko.observable(),

        'activate': function() {
            var self = this;

            self.refresh();
        },
        
        'refresh': function() {
            var self = this;

            return backend.getProjects()
                .done(function (results) {
                    
                    self.projects(results);
                })
                .fail(function (jqxhr, status) { logger.logError('Could not load Project data'); });

        },

        'viewProject': function(proj) {
            addProjectVm.setProject(proj);
            app.showModal(addProjectVm);
        },

        'addProject': function () {
            var self = this;
            addProjectVm.setProject(null);
            app.showModal(addProjectVm).done(function(result) {
                if (result) {
                    self.refresh();
                }
            });
        }
    };


    return projectList;
});