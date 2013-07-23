define(["require", "exports", "services/logger", "plugins/http"], function(require, exports, __logger__, __http__) {
    function makeRiskDto() {
        return {
            id: null,
            version: null,
            riskNumber: null,
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

    function makeNewAssumption() {
        return {
            id: null,
            version: null,
            assumptionNumber: null,
            description: "",
            workstream: "",
            owner: "",
            validatedBy: "",
            statusId: "",
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

    var logger = __logger__;
    var http = __http__;

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

    function getProjectRisks(id, active) {
        return $.getJSON("/api/project/" + id + "/risks/", { active: active });
    }
    exports.getProjectRisks = getProjectRisks;
    ;

    function getProjectAssumptions(id, active) {
        return $.getJSON("/api/project/" + id + "/assumptions/", { active: active });
    }
    exports.getProjectAssumptions = getProjectAssumptions;
    ;

    function getProjectIssues(id, active) {
        return $.getJSON("/api/project/" + id + "/issues/", { active: active });
    }
    exports.getProjectIssues = getProjectIssues;
    ;

    function getProjectDependencies(id, active) {
        return $.getJSON("/api/project/" + id + "/dependencies/", { active: active });
    }
    exports.getProjectDependencies = getProjectDependencies;
    ;

    function getProjectQueries(id, active) {
        return $.getJSON("/api/project/" + id + "/queries/", { active: active });
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
});
