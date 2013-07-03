define(function(require) {

    var backend = require('services/backend'),
        logger = require('services/logger'),
        app = require('durandal/app'),
        router = require('durandal/plugins/router'),
        addProjectVm = require('viewmodels/newProject');

    var projectList = {
        projects: ko.observableArray([]),

        selectedProject: ko.observable(),

        activate: function() {
            var self = this;

            self.refresh();
        },
        
        refresh: function() {
            var self = this;

            return backend.getProjects()
                .done(function (results) {
                    
                    self.projects(results);
                })
                .fail(function (jqxhr, status) { logger.logError('Could not load Project data'); });

        },

        viewProject: function(proj) {
            addProjectVm.setProject(proj);
            app.showModal(addProjectVm);
        },

        addProject: function () {
            var self = this;
            addProjectVm.setProject(null);
            app.showModal(addProjectVm).done(function(result) {
                if (result) {
                    self.refresh();
                }
            });

        },


        viewActiveRisks: function(project) {
            router.navigateTo("#/projects/" + project.id + "/risks/active");
        },
        
        viewClosedRisks: function (project) {
            router.navigateTo("#/projects/" + projectId + "/risks/closed");
        },

       
        viewActiveAssumptions: function(project) {
            router.navigateTo("#/projects/" + project.id + "/assumptions/active");
        },
        
        viewClosedAssumptions: function (project) {
            router.navigateTo("#/projects/" + projectId + "/assumptions/closed");
        },
        

        viewActiveIssues: function(project) {
            router.navigateTo("#/projects/" + project.id + "/issues/active");
        },
        
        viewClosedIssues: function (project) {
            router.navigateTo("#/projects/" + projectId + "/issues/closed");
        },
        
        viewActiveDependencies: function(project) {
            router.navigateTo("#/projects/" + project.id + "/dependencies/active");
        },
        
        viewClosedDependencies: function (project) {
            router.navigateTo("#/projects/" + projectId + "/dependencies/closed");
        },

        viewActiveQueries: function (project) {
            router.navigateTo("#/projects/" + project.id + "/queries/active");
        },

        viewClosedQueries: function (project) {
            router.navigateTo("#/projects/" + projectId + "/queries/closed");
        }



    };


    return projectList;
});