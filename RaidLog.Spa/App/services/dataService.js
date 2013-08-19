define(["require", "exports", "services/logger", "plugins/http"], function(require, exports, __logger__, __http__) {
    /// <reference path='../../Scripts/typings/jquery/jquery.d.ts' />
    /// <reference path='../../Scripts/typings/requirejs/require.d.ts' />
    /// <reference path='../../Scripts/typings/moment/moment.d.ts' />
    /// <reference path='../../Scripts/typings/knockout/knockout.amd.d.ts' />
    /// <reference path='../../Scripts/typings/knockout/knockout.d.ts' />
    /// <reference path='../../Scripts/typings/knockout.mapping/knockout.mapping.d.ts' />
    /// <reference path='../../Scripts/typings/knockout.validation/knockout.validation.d.ts' />
    /// <reference path='../../Scripts/typings/durandal/durandal.d.ts' />
    var logger = __logger__;
    var http = __http__;

    function makeRiskDto() {
        return {
            id: 0,
            version: "",
            riskNumber: 0,
            description: "",
            raisedDate: moment().local().format("YYYY-MM-DD"),
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

    function makeIssueDto(projectId) {
        return {
            id: null,
            version: null,
            projectId: projectId,
            issueNumber: null,
            description: "",
            raisedDate: moment().local().format("YYYY-MM-DD"),
            raisedBy: "",
            owner: "",
            workstream: "",
            commentary: "",
            resolvedDate: "",
            resolvedBy: "",
            resolutionDescription: "",
            ragStatus: "Green",
            previousRagStatus: "Green",
            dateLastReviewed: "",
            expectedClosureDate: "",
            isEscalatedToProgramme: false
        };
    }
    exports.makeIssueDto = makeIssueDto;

    function makeNewIssueDto() {
        return {
            projectId: 0,
            description: "",
            raisedDate: moment().local().format("YYYY-MM-DD"),
            raisedBy: "",
            owner: "",
            workstream: "",
            commentary: "",
            ragStatus: "Green",
            expectedClosureDate: ""
        };
    }
    exports.makeNewIssueDto = makeNewIssueDto;

    function makeEditIssueDto() {
        return {
            id: 0,
            version: "",
            description: "",
            owner: "",
            workstream: "",
            commentary: "",
            resolvedDate: "",
            resolvedBy: "",
            resolutionDescription: "",
            ragStatus: "Green",
            expectedClosureDate: "",
            isEscalatedToProgramme: false
        };
    }
    exports.makeEditIssueDto = makeEditIssueDto;

    function makeDependencyDto(projectId) {
        if (typeof projectId === "undefined") { projectId = 0; }
        return {
            id: 0,
            version: "",
            projectId: projectId,
            dependencyNumber: 0,
            status: "",
            workstream: "",
            description: "",
            plannedDate: "",
            requiredByDate: "",
            comments: "",
            ragStatus: "",
            dependencyLevel: ""
        };
    }
    exports.makeDependencyDto = makeDependencyDto;

    function MakeNewDependencyDto() {
        return {
            projectId: 0,
            dependencyNumber: 0,
            status: "",
            workstream: "",
            description: "",
            plannedDate: "",
            requiredByDate: "",
            comments: "",
            ragStatus: "",
            dependencyLevel: ""
        };
    }
    exports.MakeNewDependencyDto = MakeNewDependencyDto;

    function MakeEditDependencyDto() {
        return {
            id: 0,
            version: "",
            dependencyNumber: 0,
            status: "",
            workstream: "",
            description: "",
            plannedDate: "",
            requiredByDate: "",
            comments: "",
            ragStatus: "",
            dependencyLevel: ""
        };
    }
    exports.MakeEditDependencyDto = MakeEditDependencyDto;

    function makeActionDto(parentItemType, parentItemId) {
        if (typeof parentItemType === "undefined") { parentItemType = ""; }
        if (typeof parentItemId === "undefined") { parentItemId = 0; }
        return {
            id: 0,
            version: "",
            actionNumber: 0,
            parentItemType: parentItemType,
            parentItemId: parentItemId,
            parentItemNumber: 0,
            description: "",
            actor: "",
            actionStatusId: 0,
            dueDate: "",
            resolvedDate: "",
            resolution: ""
        };
    }
    exports.makeActionDto = makeActionDto;
    ;

    function makeNewActionDto() {
        return {
            parentItemType: "",
            parentItemId: 0,
            description: "",
            actor: "",
            actionStatusId: 0,
            dueDate: ""
        };
    }
    exports.makeNewActionDto = makeNewActionDto;

    function makeEditActionDto() {
        return {
            id: 0,
            version: "",
            description: "",
            actor: "",
            actionStatusId: 0,
            dueDate: "",
            resolvedDate: "",
            resolution: ""
        };
    }
    exports.makeEditActionDto = makeEditActionDto;

    function makeQueryDto(projectId) {
        if (typeof projectId === "undefined") { projectId = 0; }
        return {
            id: null,
            version: null,
            projectId: projectId,
            queryNumber: null,
            workstream: null,
            deliverableImpacted: null,
            urgency: null,
            description: null,
            raisedBy: null,
            raisedTo: null,
            raisedDate: null,
            answer: null,
            answeredBy: null,
            answeredDate: null,
            confirmedInDocuments: null,
            updatedBy: null,
            updatedTimestamp: null
        };
    }
    exports.makeQueryDto = makeQueryDto;

    function makeNewQueryDto(projectId) {
        if (typeof projectId === "undefined") { projectId = 0; }
        return {
            projectId: projectId,
            workstream: "",
            deliverableImpacted: "",
            urgency: "",
            description: "",
            raisedBy: "",
            raisedTo: "",
            raisedDate: ""
        };
    }
    exports.makeNewQueryDto = makeNewQueryDto;

    function makeEditQueryDto() {
        return {
            id: 0,
            version: "",
            workstream: "",
            deliverableImpacted: "",
            urgency: "",
            description: "",
            raisedTo: "",
            answer: "",
            answeredBy: "",
            answeredDate: "",
            confirmedInDocuments: ""
        };
    }
    exports.makeEditQueryDto = makeEditQueryDto;
    ;

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

    // id - project id
    // active - true for open risks, false for closed, null for both.
    function getProjectRisks(id) {
        return $.getJSON("/api/project/" + id + "/risks/").done(function (data) {
            return logger.logSuccess("Retrieved Project Risks", data, MODULE_NAME, true);
        }).fail(function (jqxhr, status, ex) {
            return logger.logError("Error retrieving Project Risks", jqxhr, MODULE_NAME, true);
        });
    }
    exports.getProjectRisks = getProjectRisks;
    ;

    // id - project id
    // active - true for open risks, false for closed, null for both.
    function getProjectAssumptions(id) {
        return $.getJSON("/api/project/" + id + "/assumptions/").done(function (data) {
            logger.logSuccess("Retrieved Project Assumptions", data, MODULE_NAME, true);
        }).fail(function (jqxhr, status, ex) {
            logger.logError("Error retrieving Project Assumptions", jqxhr, MODULE_NAME, true);
        });
    }
    exports.getProjectAssumptions = getProjectAssumptions;
    ;

    // id - project id
    // active - true for open risks, false for closed, null for both.
    function getProjectIssues(id) {
        return $.getJSON("/api/project/" + id + "/issues/").done(function (data) {
            logger.logSuccess("Retrieve Project Issues", data, MODULE_NAME, true);
        }).fail(function (jqxhr, status, ex) {
            logger.logError("Error retrieving Project Issues", jqxhr, MODULE_NAME, true);
        });
    }
    exports.getProjectIssues = getProjectIssues;
    ;

    // id - project id
    // active - true for open risks, false for closed, null for both.
    function getProjectDependencies(id) {
        return $.getJSON("/api/project/" + id + "/dependencies/").done(function (data) {
            logger.logSuccess("Retrieve Project Dependencies", data, MODULE_NAME, true);
        }).fail(function (jqxhr, status, ex) {
            logger.logError("Error retrieving Project Dependencies", jqxhr, MODULE_NAME, true);
        });
    }
    exports.getProjectDependencies = getProjectDependencies;
    ;

    // id - project id
    // active - true for open risks, false for closed, null for both.
    function getProjectQueries(id) {
        return $.getJSON("/api/project/" + id + "/queries/");
    }
    exports.getProjectQueries = getProjectQueries;
    ;

    function getProjectActions(id) {
        return $.getJSON("/api/project/" + id + "/actions/").done(function (data) {
            logger.logSuccess("Retrieved Project Actions", data, MODULE_NAME, true);
        }).fail(function (jqxhr, status, ex) {
            logger.logError("Error retrieving Project Actions", jqxhr, MODULE_NAME, true);
        });
    }
    exports.getProjectActions = getProjectActions;

    function getActionsFor(itemType, itemId) {
        if (itemType === 'Dependency') {
            itemType = 'Dependencie';
        }
        return $.getJSON("/api/" + itemType + "s/" + itemId + "/actions/").done(function (data) {
            logger.logSuccess("Retrieved " + itemType + " Actions", data, MODULE_NAME, true);
        }).fail(function (jqxhr, status, ex) {
            logger.logError("Error retrieving " + itemType + " Actions", jqxhr, MODULE_NAME, true);
        });
    }
    exports.getActionsFor = getActionsFor;

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
            logger.logSuccess("Saved Assumption", null, MODULE_NAME, true);
        }).fail(function (jqxhr, status, ex) {
            logger.logError(status + " " + jqxhr.responseText, assumption, MODULE_NAME, false);
            logger.logError("Error saving the Assumption", null, MODULE_NAME, true);
        });
    }
    exports.saveAssumption = saveAssumption;

    function saveIssue(projectId, issue) {
        var options = { data: issue };

        if ('id' in issue) {
            options.url = '/api/issues/' + issue['id'];
            options.type = 'PUT';
        } else {
            options.url = '/api/project/' + projectId + '/issues/';
            options.type = 'POST';
        }

        return $.ajax(options).done(function (data, status, jqxhr) {
            logger.logSuccess("Saved Issue", null, MODULE_NAME, true);
        }).fail(function (jqxhr, status, ex) {
            logger.logError(status + " " + jqxhr.responseText, issue, MODULE_NAME, false);
            logger.logError("Error saving the Issue", null, MODULE_NAME, true);
        });
    }
    exports.saveIssue = saveIssue;

    function saveDependency(dto) {
        var options = { data: dto };
        if ('id' in dto) {
            options.url = "/api/dependencies/" + dto["id"];
            options.type = "PUT";
        } else {
            options.url = "/api/project/" + dto["projectId"] + "/dependencies";
            options.type = "POST";
        }

        return $.ajax(options).done(function (data) {
            logger.logSuccess("Saved Dependency", data, MODULE_NAME, true);
        }).fail(function (jqxhr, status, ex) {
            logger.logError(status + " " + jqxhr.responseText, dto, MODULE_NAME, false);
            logger.logError("Error saving the Dependency", jqxhr, MODULE_NAME, true);
        });
    }
    exports.saveDependency = saveDependency;

    function saveQuery(dto) {
        var options = { data: dto };
        if ('id' in dto) {
            options.url = "/api/queries/" + dto["id"];
            options.type = "PUT";
        } else {
            options.url = "/api/project/" + dto["projectId"] + "/queries";
            options.type = "POST";
        }

        return $.ajax(options).done(function (data) {
            logger.logSuccess("Saved Query", data, MODULE_NAME, true);
        }).fail(function (jqxhr, status, ex) {
            logger.logError(status + " " + jqxhr.responseText, dto, MODULE_NAME, false);
            logger.logError("Error saving the Query", jqxhr, MODULE_NAME, true);
        });
    }
    exports.saveQuery = saveQuery;

    function saveAction(dto) {
        var options = { data: dto };

        if ('id' in dto) {
            options.url = "/api/actions/" + dto['id'];
            options.type = "PUT";
        } else {
            var newActionDto = dto;

            options.url = "/api/actions/";
            options.type = "POST";
        }

        return $.ajax(options).done(function (data, status, jqxhr) {
            logger.log("Saved Action", null, MODULE_NAME, true);
        }).fail(function (jqxhr, status, ex) {
            logger.logError(status + " " + jqxhr.responseText, dto, MODULE_NAME, false);
            logger.logError("Error saving the Action", null, MODULE_NAME, true);
        });
    }
    exports.saveAction = saveAction;
});
