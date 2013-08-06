﻿define(["require", "exports", "services/logger", "plugins/http"], function(require, exports, __logger__, __http__) {
    var logger = __logger__;
    var http = __http__;

    function makeRiskDto() {
        return {
            id: 0,
            version: "",
            riskNumber: 0,
            description: "",
            raisedDate: moment().format("YYYY-MM-DD"),
            raisedBy: "",
            rifCategoryId: null,
            isProjectRisk: true,
            workstream: "",
            commentary: "",
            approachId: null,
            impactId: null,
            likelihoodId: null,
            owner: ""
        };
    }
    exports.makeRiskDto = makeRiskDto;

    ;

    function makeNewAssumption() {
        return {
            id: null,
            version: null,
            assumptionNumber: null,
            description: "",
            workstream: "",
            owner: "",
            validatedBy: "",
            statusId: null,
            supportingDocumentation: ""
        };
    }
    exports.makeNewAssumption = makeNewAssumption;

    function makeNewIssueDto() {
        return {
            id: null,
            version: null,
            issueNumber: null
        };
    }
    exports.makeNewIssueDto = makeNewIssueDto;

    function makeNewDependencyDto() {
        return {
            id: null,
            version: null,
            dependencyNumber: null
        };
    }
    exports.makeNewDependencyDto = makeNewDependencyDto;

    function makeNewQueryDto() {
        return {
            id: null,
            version: null,
            queryNumber: null
        };
    }
    exports.makeNewQueryDto = makeNewQueryDto;

    var referenceData;

    var MODULE_NAME = "services/dataService";

    var refDataDfd = http.get('/api/ReferenceData/').done(function (data) {
        referenceData = data;
        logger.logSuccess("Retrieved reference data", {}, MODULE_NAME, true);
    }).fail(function (jqxhr, status, err) {
        logger.logError("Could not retrieve reference data (" + status + ")", arguments, MODULE_NAME, true);
    });

    function getReferenceData() {
        return refDataDfd;
    }
    exports.getReferenceData = getReferenceData;

    function getProjects() {
        return http.get('/api/projects/').done(function (data) {
            logger.logSuccess("Retrieved Projects", data, MODULE_NAME, true);
        }).fail(function (jqxhr, status, ex) {
            logger.logError("Could not retrieve Projects", arguments, MODULE_NAME, true);
        });
    }
    exports.getProjects = getProjects;

    function getProject(id) {
        return http.get('/api/projects/' + id).done(function (data) {
            return logger.logSuccess("Retrieved Project", data, MODULE_NAME, false);
        }).fail(function (jqxhr, status, ex) {
            return logger.logError("Error retrieving Project", jqxhr, MODULE_NAME, true);
        });
    }
    exports.getProject = getProject;

    function getProjectRisks(id) {
        return $.getJSON("/api/project/" + id + "/risks/").done(function (data) {
            return logger.logSuccess("Retrieved Project Risks", data, MODULE_NAME, true);
        }).fail(function (jqxhr, status, ex) {
            return logger.logError("Error retrieving Project Risks", jqxhr, MODULE_NAME, true);
        });
    }
    exports.getProjectRisks = getProjectRisks;
    ;

    function getProjectAssumptions(id) {
        return $.getJSON("/api/project/" + id + "/assumptions/").done(function (data) {
            logger.logSuccess("Retrieved Project Assumptions", data, MODULE_NAME, true);
        }).fail(function (jqxhr, status, ex) {
            logger.logError("Error retrieving Project Assumptions", jqxhr, MODULE_NAME, true);
        });
    }
    exports.getProjectAssumptions = getProjectAssumptions;
    ;

    function getProjectIssues(id) {
        return $.getJSON("/api/project/" + id + "/issues/");
    }
    exports.getProjectIssues = getProjectIssues;
    ;

    function getProjectDependencies(id) {
        return $.getJSON("/api/project/" + id + "/dependencies/");
    }
    exports.getProjectDependencies = getProjectDependencies;
    ;

    function getProjectQueries(id) {
        return $.getJSON("/api/project/" + id + "/queries/");
    }
    exports.getProjectQueries = getProjectQueries;
    ;

    function saveProject(proj) {
        var options = {
            url: "/api/projects/",
            data: proj,
            dataType: 'json'
        };

        if (proj.id) {
            options.url = options.url + proj.id;
            options.type = "PUT";
        } else {
            options.type = "POST";
        }

        return $.ajax(options).done(function (data, status, jqxhr) {
            logger.logSuccess("Saved Project", null, "services/dataService", true);
        }).fail(function (jqxhr, status, ex) {
            logger.logError("Error saving the Project", {}, "services/dataService", true);
            logger.logError(status + " " + jqxhr.responseText, proj, "services/dataService", false);
        });
    }
    exports.saveProject = saveProject;

    function saveRisk(projectId, risk) {
        var options = {
            data: risk
        };

        if ('id' in risk) {
            options.url = "/api/risks/" + risk['id'];
            options.type = "PUT";
        } else {
            options.url = "/api/project/" + projectId + "/risks/";
            options.type = "POST";
        }

        return $.ajax(options).done(function (data, status, jqxhr) {
            logger.log("Saved Risk", null, null, true);
        }).fail(function (jqxhr, status, ex) {
            logger.logError(status + " " + jqxhr.responseText, risk, "backend", false);
            logger.logError("Error saving the Risk", null, "backend", true);
        });
    }
    exports.saveRisk = saveRisk;

    function saveAssumption(projectId, assumption) {
        var options = { data: assumption };

        if ('id' in assumption) {
            options.url = '/api/assumptions/' + assumption['id'];
            options.type = 'PUT';
        } else {
            options.url = '/api/project/' + projectId + '/assumptions/';
            options.type = 'POST';
        }

        return $.ajax(options).done(function (data, status, jqxhr) {
            logger.log("Saved Assumption", null, MODULE_NAME, true);
        }).fail(function (jqxhr, status, ex) {
            logger.logError(status + " " + jqxhr.responseText, assumption, MODULE_NAME, false);
            logger.logError("Error saving the Risk", null, MODULE_NAME, true);
        });
    }
    exports.saveAssumption = saveAssumption;
});