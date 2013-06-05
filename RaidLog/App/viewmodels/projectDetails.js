define(function(require) {
    var backend = require("services/backend");

    var projectDetails = function projectDetails() {
        var self = this;

        self.projectId = 0;
        self.versionNumber = 0;

        self.code = ko.observable("");

        self.name = ko.observable("");

        self.risks = ko.observableArray([]);

        self.selectedRisks = ko.observableArray([]);

        self.selectedIndex = ko.observable(-1);

        self.assumptions = ko.observableArray([]);

        self.issues = ko.observableArray([]);

        self.dependencies = ko.observableArray([]);

        self.queries = ko.observableArray([]);
        
        self.activate = function (id) {

            self.projectId = id;

            backend.getProjectDetails(id).done(function(proj) {
                self.code(proj.code);
                self.name(proj.name);
            });

            backend.getProjectRisks(id).done(function(data) {
                var observableRisks = ko.mapping.fromJSON(data);
                
                self.risks(observableRisks);
            });

            backend.getProjectAssumptions(id).done(function(data) { self.assumptions(data); });

            backend.getProjectIssues(id).done(function(data) { self.issues(data); });

            backend.getProjectDependencies(id).done(function(data) { self.dependencies(data); });

            backend.getProjectQueries(id).done(function(data) { self.queries(data); });

        };


        
        self.saveRisk = function (risk) {
            
        };



        self.saveAssumption = function(assumption) {

        };

        self.saveIssue = function(issue) {

        };

        self.saveDependency = function(dependency) {

        };

        self.saveQuery = function(query) {

        };
    };

    return projectDetails;
});