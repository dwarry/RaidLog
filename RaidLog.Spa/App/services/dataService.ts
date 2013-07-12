/// <reference path='../../Scripts/typings/jquery/jquery.d.ts' />
/// <reference path='../../Scripts/typings/requirejs/require.d.ts' />
/// <reference path='../../Scripts/typings/knockout/knockout.amd.d.ts' />
/// <reference path='../../Scripts/typings/knockout/knockout.d.ts' />
/// <reference path='../../Scripts/typings/knockout.mapping/knockout.mapping.d.ts' />
/// <reference path='../../Scripts/typings/knockout.validation/knockout.validation.d.ts' />
/// <reference path='../../Scripts/typings/durandal/durandal.d.ts' />

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
    score: string;
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

export interface ProjectSummaryWithCounts{
    id: number;
    version: string;
    code: string;
    name: string;
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

import http = require("plugins/http");
import logger = require("services/logger");

var referenceData: ReferenceDataDto;

var refDataDfd = http.get('/api/ReferenceData/')
    .done(function (data) {
        referenceData = data;
        logger.logSuccess("Retrieved reference data", {}, "services/dataService", true);
    })
    .fail(function (jqxhr, status, err) {
        logger.logError("Could not retrieve reference data (" + status + ")", arguments, "services/dataService", true);
    });


export function getReferenceData() {
    return refDataDfd;
}

export function getProjects() {

    return http.get('/api/projects/').done((data: ProjectSummaryWithCounts) => {
        logger.logSuccess("Retrieved Projects", data, "services/dataService", true);
    }).fail((jqxhr, status, ex) =>{
            logger.logError("Could not retrieve Projects", arguments, "services/dataService", true);
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