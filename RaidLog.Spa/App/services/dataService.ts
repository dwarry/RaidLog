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

export interface ActionStatusDto {
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
    actionStatuses: ActionStatusDto[];
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
    activeActions: number;
    closedRisks: number;
    closedAssumptions: number;
    closedIssues: number;
    closedDependencies: number;
    closedQueries: number;
    closedActions: number;
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

    projectId: number;

    issueNumber: number;

    description: string;

    raisedDate: string;

    raisedBy: string;

    owner: string;

    workstream: string;

    commentary: string;

    resolvedDate: string;

    resolvedBy: string;

    resolutionDescription: string;

    ragStatus: string;

    previousRagStatus: string;

    dateLastReviewed: string;

    expectedClosureDate: string;

    isEscalatedToProgramme: boolean;
}

export function makeIssueDto(projectId:number): IssueDto{
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

export interface MaintainIssueDto {
    description: string;

    owner: string;

    workstream: string;

    commentary: string;

    ragStatus: string;

    expectedClosureDate: string;
}

export interface NewIssueDto extends MaintainIssueDto {
    projectId: number;

    raisedDate: string;

    raisedBy: string;

}

export interface EditIssueDto extends MaintainIssueDto {
    id: number;
    version: string;

    resolvedDate: string;
    resolvedBy: string;
    resolutionDescription: string;
    isEscalatedToProgramme: boolean;
}

export function makeNewIssueDto(): NewIssueDto {
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

export function makeEditIssueDto(): EditIssueDto {
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

export interface DependencyDto{
    id: number;
    versionNumber: string; 
    projectId: number;
    dependencyNumber: number;
    status: string;
    workstream: string;
    description: string;
    plannedDate: string;
    requiredByDate: string;
    comments: string;
    ragStatus: string;
    dependencyLevel: string;
}

export function MakeDependencyDto(): DependencyDto {
    return {
        id: 0,
        versionNumber: "",
        projectId: 0,
        dependencyNumber: 0,
        status: "",
        workstream: "",
        description: "",
        plannedDate: "",
        requiredByDate: "",
        comments: "",
        ragStatus: "",
        dependencyLevel: "",
    };
}

export interface MaintainDependencyDto{
    status: string;
    workstream: string;
    description: string;
    plannedDate: string;
    requiredByDate: string;
    comments: string;
    ragStatus: string;
    dependencyLevel: string;
}

export interface NewDependencyDto extends MaintainDependencyDto{
    projectId: number;
}

export function MakeNewDependencyDto(): NewDependencyDto {
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

export interface EditDependencyDto extends MaintainDependencyDto{
    id: number;
    versionNumber: string;
}

export function MakeEditDependencyDto(): EditDependencyDto {
    return {
        id: 0,
        versionNumber: "",
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

export interface ActionDto {
    id: number;
    version: string;
    actionNumber: number;
    parentItemType: string;
    parentItemId: number;
    parentItemNumber: number;
    description: string;
    actor: string;
    actionStatusId: number;
    dueDate: string;
    resolvedDate: string;
    resolution: string;
}

export function makeActionDto(): ActionDto {
    return {
        id: 0,
        version: "",
        actionNumber: 0,
        parentItemType: "",
        parentItemId: 0,
        parentItemNumber:0,
        description: "",
        actor: "",
        actionStatusId: 0,
        dueDate: "",
        resolvedDate: "",
        resolution: ""
    };
};

export interface MaintainActionDto {
    description: string;
    actor: string;
    actionStatusId: number;
    dueDate: string;
}

export interface NewActionDto extends MaintainActionDto {
    parentItemType: string;
    parentItemId: number;
}

export function makeNewActionDto(): NewActionDto{
    return {
        parentItemType: "",
        parentItemId: 0,
        description: "",
        actor: "",
        actionStatusId: 0,
        dueDate: ""
    };
}


export interface EditActionDto extends MaintainActionDto{
    id: number;
    version: string;
    resolvedDate: string;
    resolution: string;
}

export function makeEditActionDto() {
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
    return $.getJSON("/api/project/" + id + "/issues/")
        .done(data => { logger.logSuccess("Retrieve Project Issues", data, MODULE_NAME, true); })
        .fail((jqxhr, status, ex) => { logger.logError("Error retrieving Project Issues", jqxhr, MODULE_NAME, true);});
};

// id - project id
// active - true for open risks, false for closed, null for both.
export function getProjectDependencies(id:number): JQueryPromise<DependencyDto[]> {
    return $.getJSON("/api/project/" + id + "/dependencies/")
        .done(data => { logger.logSuccess("Retrieve Project Dependencies", data, MODULE_NAME, true); })
        .fail((jqxhr, status, ex) => { logger.logError("Error retrieving Project Dependencies", jqxhr, MODULE_NAME, true); });
};

// id - project id
// active - true for open risks, false for closed, null for both.
export function getProjectQueries(id:number): JQueryPromise <QueryDto[] > {
    return $.getJSON("/api/project/" + id + "/queries/");
};

export function getProjectActions(id: number): JQueryPromise<ActionDto[]>{
    return $.getJSON("/api/project/" + id + "/actions/").done(data => { logger.logSuccess("Retrieved Project Actions", data, MODULE_NAME, true); })
        .fail((jqxhr, status, ex) => { logger.logError("Error retrieving Project Actions", jqxhr, MODULE_NAME, true); });
}

export function getActionsFor(itemType: string, itemId: number) {
    return $.getJSON("/api/" + itemType + "s/" + itemId + "/actions/")
        .done(data => { logger.logSuccess("Retrieved " + itemType + " Actions", data, MODULE_NAME, true); })
        .fail((jqxhr, status, ex) => { logger.logError("Error retrieving " + itemType + " Actions", jqxhr, MODULE_NAME, true); });
}


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
        logger.logSuccess("Saved Assumption", null, MODULE_NAME, true);
    }).fail(function (jqxhr, status, ex) {
            logger.logError(status + " " + jqxhr.responseText, assumption, MODULE_NAME, false);
            logger.logError("Error saving the Assumption", null, MODULE_NAME, true);
        });
}

export function saveIssue(projectId: number, issue: MaintainIssueDto) {
    var options: JQueryAjaxSettings = { data: issue };

    if ('id' in issue) {
        options.url = '/api/issues/' + issue['id'];
        options.type = 'PUT';
    }
    else {
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

export function saveDependency(dto: MaintainDependencyDto) {
    var options: JQueryAjaxSettings = { data: dto };
    if ('id' in dto) {
        options.url = "/api/dependencies/" + dto["id"];
        options.type = "PUT";
    } else {
        options.url = "/api/project/" + dto["projectId"] + "/dependencies";
        options.type = "POST";
    }

    return $.ajax(options).done(data => {
        logger.logSuccess("Saved Dependency", data, MODULE_NAME, true);
    }).fail((jqxhr, status, ex) => {
            logger.logError(status + " " + jqxhr.responseText, dto, MODULE_NAME, false);
            logger.logError("Error saving the Dependency", jqxhr, MODULE_NAME, true);
        });
}

export function saveAction( dto: MaintainActionDto) {

    var options: JQueryAjaxSettings = { data: dto };

    if ('id' in dto) {
        options.url = "/api/actions/" + dto['id'];
        options.type = "PUT";
    } else {
        var newActionDto = <NewActionDto>dto;

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