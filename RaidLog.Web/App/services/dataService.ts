
/// <reference path='../../Scripts/typings/jquery/jquery.d.ts' />
/// <reference path='../../Scripts/typings/requirejs/require.d.ts' />
/// <reference path='../../Scripts/typings/knockout/knockout.amd.d.ts' />
/// <reference path='../../Scripts/typings/knockout/knockout.d.ts' />
/// <reference path='../../Scripts/typings/knockout.mapping/knockout.mapping.d.ts' />
/// <reference path='../../Scripts/typings/knockout.validation/knockout.validation.d.ts' />
/// <reference path='../../Scripts/typings/durandal/durandal.d.ts' />

interface ProjectSummary{
    code: string;
    description: string;
}

interface AssumptionStatusDto {
    
    id: number;
    description: string;
    isFinalState: boolean;
}

interface ApproachDto {
    id: number;
    descripton: string;
}

interface ImpactDto {
    id: number;
    description: string;
    score: number;
    budgetImpact: string;
    timeOverrunImpact: string;
    businessImpact: string;
    reputationalImpact: string;
}

interface LikelihoodDto{
    id: number;
    description: string;
    score: string;
}

interface RifCategoryDto{
    id: number;
    description: string;
}

interface ReferenceDataDto{
    approaches: ApproachDto[];
    impacts: ImpactDto[];
    likelihoods: LikelihoodDto[];
    rifCategories: RifCategoryDto[];
    assumptionStatuses: AssumptionStatusDto[];
}

define(['services/logger','durandal/http'], function (logger,http:DurandalHttp) {
    var referenceData: ReferenceDataDto;
    var refDataDfd = http.get('/api/ReferenceData/', {})
        .done(function (data) { referenceData = data; })
        .fail(function (jqxhr, status, err) { });
});
