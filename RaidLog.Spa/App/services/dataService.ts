/// <reference path='../../Scripts/typings/jquery/jquery.d.ts' />
/// <reference path='../../Scripts/typings/requirejs/require.d.ts' />
/// <reference path='../../Scripts/typings/moment/moment.d.ts' />
/// <reference path='../../Scripts/typings/knockout/knockout.amd.d.ts' />
/// <reference path='../../Scripts/typings/knockout/knockout.d.ts' />
/// <reference path='../../Scripts/typings/knockout.mapping/knockout.mapping.d.ts' />
/// <reference path='../../Scripts/typings/knockout.validation/knockout.validation.d.ts' />
/// <reference path='../../Scripts/typings/durandal/durandal.d.ts' />
import logger = require("services/logger");
import http = require("plugins/http");

export interface AssumptionStatusDto {
    
    id: number;
    description: string;
    isFinalState: boolean;
}

export interface ApproachDto {
    id: number;
    descripton: string;
}

export interface ImpactDto {
    id: number;
    description: string;
    score: number;
    budgetImpact: string;
    timeOverrunImpact: string;
    businessImpact: string;
    reputationalImpact: string;
}

export interface LikelihoodDto{
    id: number;
    description: string; 
    score: number;
}

export interface RifCategoryDto{
    id: number;
    description: string;
}

export interface ReferenceDataDto{
    approaches: ApproachDto[];
    impacts: ImpactDto[];
    likelihoods: LikelihoodDto[];
    rifCategories: RifCategoryDto[];
    assumptionStatuses: AssumptionStatusDto[];
}


export interface ProjectDto {
    id: number;
    version: string;
    code: string;
    name: string;
}

export interface ProjectSummaryWithCounts extends ProjectDto {
    activeRisks: number;
    activeAssumptions: number;
    activeIssues: number;
    activeDependencies: number;
    activeQueries: number;
    closedRisks: number;
    closedAssumptions: number;
    closedIssues: number;
    closedDependencies: number;
    closedQueries: number;
}

export interface RiskDto{
    id: number;

    version: string;

    riskNumber: number;

    description: string;

    raisedDate: string;

    raisedBy: string;

    rifCategoryId: number;

    isProjectRisk: boolean;

    workstream: string;

    commentary: string;

    approachId: number;

    impactId: number;

    likelihoodId: number;

    owner: string;
}

export function makeRiskDto(): RiskDto {
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

export interface NewRiskDto {
    description: string;

    raisedDate: string;

    raisedBy: string;

    rifCategoryId: number;

    isProjectRisk: boolean;

    workstream: string;

    commentary: string;

    approachId: number;

    impactId: number;

    likelihoodId: number;

    owner: string;
}


export interface EditRiskDto extends NewRiskDto {
    id: number;

    version: string;
}

export interface NewAssumptionDto {

    description: string;

    workstream: string;

    owner: string;

    validatedBy: string;

    statusId: number;

    supportingDocumentation: string;
}

export interface EditAssumptionDto extends NewAssumptionDto{
    id: number;

    version: string;

    projectId: number;

    assumptionNumber: number;
};


export interface AssumptionDto{
    id: number;

    version: string;

    assumptionNumber: number;

    description: string;

    workstream: string;

    owner: string;

    validatedBy: string;

    statusId: number;

    supportingDocumentation: string;
}

export function makeNewAssumption(): AssumptionDto{
    return {
        id: null,
        version: null,
        assumptionNumber: null,
        description: "",
        workstream: "",
        owner: "",
        validatedBy: "",
        statusId: <number>null,
        supportingDocumentation: "",
    };
}

export interface IssueDto{
    id: number;

    version: string;

    issueNumber: number;
}

export function makeNewIssueDto(): IssueDto{
    return {
        id: null,
        version: null,
        issueNumber: null
    };
}

export interface DependencyDto{
    id: number;

    version: string;

    dependencyNumber: number;


}

export function makeNewDependencyDto(): DependencyDto{
    return {
        id: null,
        version: null,
        dependencyNumber: null
    };
}

export interface QueryDto{
    id: number;

    version: string;

    queryNumber: number;
}

export function makeNewQueryDto(): QueryDto {
    return {
        id: null,
        version: null,
        queryNumber: null
    };
}


var referenceData: ReferenceDataDto;

var MODULE_NAME = "services/dataService";

var refDataDfd: JQueryPromise<ReferenceDataDto> = http.get('/api/ReferenceData/')
    .done(function (data) {
        referenceData = data;
        logger.logSuccess("Retrieved reference data", {}, MODULE_NAME, true);
    })
    .fail(function (jqxhr, status, err) {
        logger.logError("Could not retrieve reference data (" + status + ")", arguments, MODULE_NAME, true);
    });


export function getReferenceData() : JQueryPromise<ReferenceDataDto> {
    return refDataDfd;
}

export function getProjects() {

    return http.get('/api/projects/').done((data: ProjectSummaryWithCounts) => {
        logger.logSuccess("Retrieved Projects", data, MODULE_NAME, true);
    }).fail((jqxhr, status, ex) =>{
            logger.logError("Could not retrieve Projects", arguments, MODULE_NAME, true);
    });
}

export function getProject(id: number): JQueryPromise<ProjectDto>{
    return http.get('/api/projects/' + id)
        .done((data: ProjectDto) =>  logger.logSuccess("Retrieved Project", data, MODULE_NAME, false))
        .fail((jqxhr, status, ex) => logger.logError("Error retrieving Project", jqxhr, MODULE_NAME, true));
}
// id - project id
// active - true for open risks, false for closed, null for both.
export function getProjectRisks(id : number):JQueryPromise<RiskDto[]> {
    return $.getJSON("/api/project/" + id + "/risks/")
        .done(data => logger.logSuccess("Retrieved Project Risks", data, MODULE_NAME, true))
        .fail((jqxhr,status,ex) => logger.logError("Error retrieving Project Risks", jqxhr,MODULE_NAME, true));
};

// id - project id
// active - true for open risks, false for closed, null for both.
export function getProjectAssumptions(id: number): JQueryPromise<AssumptionDto[]> {
    return $.getJSON("/api/project/" + id + "/assumptions/")
        .done((data) => { logger.logSuccess("Retrieved Project Assumptions", data, MODULE_NAME, true); })
        .fail((jqxhr, status, ex) => { logger.logError("Error retrieving Project Assumptions", jqxhr, MODULE_NAME, true); });
};

// id - project id
// active - true for open risks, false for closed, null for both.
export function getProjectIssues(id:number): JQueryPromise<IssueDto[]> {
    return $.getJSON("/api/project/" + id + "/issues/");
};

// id - project id
// active - true for open risks, false for closed, null for both.
export function getProjectDependencies(id:number): JQueryPromise<DependencyDto[]> {
    return $.getJSON("/api/project/" + id + "/dependencies/");
};

// id - project id
// active - true for open risks, false for closed, null for both.
export function getProjectQueries(id:number): JQueryPromise <QueryDto[] > {
    return $.getJSON("/api/project/" + id + "/queries/");
};



export function saveProject(proj): JQueryPromise {
    var options: JQueryAjaxSettings = {
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

    return $.ajax(options)
        .done(function (data, status, jqxhr) {
            logger.logSuccess("Saved Project", null, "services/dataService", true);
        })
        .fail(function (jqxhr, status, ex) {
            logger.logError("Error saving the Project", {}, "services/dataService", true);
            logger.logError(status + " " + jqxhr.responseText, proj, "services/dataService", false);
        });


} 

export function saveRisk(projectId:number, risk: NewRiskDto): JQueryPromise<RiskDto> {
    var options: JQueryAjaxSettings = {
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

export function saveAssumption(projectId: number, assumption: NewAssumptionDto): JQueryPromise<AssumptionDto> {
    var options: JQueryAjaxSettings = { data: assumption };

    if ('id' in assumption) {
        options.url = '/api/assumptions/' + assumption['id'];
        options.type = 'PUT';
    }
    else {
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

/*
define(['services/logger','durandal/http'], function (logger: Logger,http) {
    var referenceData: ReferenceDataDto;
    var refDataDfd = http.get('/api/ReferenceData/', {})
        .done(function (data) { referenceData = data; })
        .fail(function (jqxhr, status, err) { });
});
*/