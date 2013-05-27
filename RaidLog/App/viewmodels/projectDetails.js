define(function(require) {
    var backend = require("backend");

    var projectDetails = function projectDetails() {
        var self = this;

        self.code = ko.observable("");

        self.name = ko.observable("");

        self.risks = ko.observableArray([]);
        
        self.assumptions = ko.observableArray([]);

        self.issues = ko.observableArray([]);

        self.dependencies = ko.observableArray([]);

        self.queries = ko.observableArray([]);

        
        self.activate = function(id) {
            backend.getProjectDetails(id).done(function(proj) {
                self.code(proj.code);
                self.name(proj.name);
            });

            backend.getProjectRisks(id).done(function(data) {
                self.risks(data);
            });

            backend.getProjectAssumptions(id).done(function(data) { self.assumptions(data); });

            backend.getProjectIssues(id).done(function(data) { self.issues(data); });

            backend.getProjectDependencies(id).done(function(data) { self.dependencies(data); });

            backend.getProjectQueries(id).done(function(data) { self.queries(data); });

        };

        self.saveRisk = function (risk) {
            
        };



        self.saveAssumption = function() {

        };

        self.saveIssue = function() {

        };

        self.saveDependency = function() {

        };

        self.saveQuery = function() {

        };
    };

    return projectDetails;
});