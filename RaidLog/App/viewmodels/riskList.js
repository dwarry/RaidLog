define(function (require) {
    var backend = require("services/backend");

    var logger = require("services/logger");

    var app = require("durandal/app");

   
    var activeRisks = ko.observable(true);

    var projectId = 0;
    
    var projectCode = ko.observable("");

    var projectName = ko.observable("");

    var approaches = ko.observableArray([]);

    var impacts = ko.observableArray();

    var impactScore = function(impactId) {
        var result = 0;
       
        $.each(impacts(), function(index, impact) {
            if (impact.id == impactId) {
                result = impact.score;
                return false;
            }
            return true;
        });

        return result;
    };

    var likelihoods = ko.observableArray();

    var likelihoodScore = function(likelihoodId) {
        var result = 0;
        
        $.each(likelihoods(), function (index, likelihood) {
            if (likelihood.id == likelihoodId) {
                result = likelihood.score;
                return false;
            }
            return true;
        });

        return result;
    };

    var rifCategories = ko.observableArray();


    var risks = new ko.simpleGrid.viewModel({ data: ko.observableArray([]), pageSize: 10 });

    backend.getReferenceData().done(function (data) {
        logger.log("Retrieved reference data", null, null, false);
        approaches(data.approaches);
        impacts(data.impacts);
        likelihoods(data.likelihoods);
        rifCategories(data.rifCategories);
    });

    var refreshRisks = function(id) {

        var riskMapping = {
            key: function (x) {
                return ko.utils.unwrapObservable(x).id;
            },
            create: function (options) {

                return riskViewModel(options.data);
            }
        };

        return backend.getProjectRisks(id, activeRisks()).done(function (data) {
            logger.log("Retrieved risks", null, null, false);

            ko.mapping.fromJS(data, riskMapping, risks.data);
        });
    };

    var riskViewModel = function(riskData) {
        var risk = {
            id: ko.observable(0),
            version: ko.observable(""),
            riskNumber: ko.observable(""),
            description: ko.observable("").extend({ required: true, maxLength: 2048 }),
            raisedDate: ko.observable("").extend({ required: true, dateISO: true }),
            raisedBy: ko.observable($(document).data("userName")).extend({ required: true, maxLength: 50 }),
            rifCategoryId: ko.observable(),
            isProjectRisk: ko.observable(true),
            workstream: ko.observable("").extend({ required: true, maxLength: 50 }),
            commentary: ko.observable("").extend({ maxLength: 2048 }),
            approachId: ko.observable(),
            impactId: ko.observable(),
            likelihoodId: ko.observable(),
            owner: ko.observable("").extend({ maxLength: 50 }),
            isActive: ko.observable(true),
        };

        risk.validation = ko.validatedObservable({
            description: risk.description,
            raisedDate: risk.raisedDate,
            raisedBy: risk.raisedBy,
            rifCategoryId: risk.rifCategoryId,
            isProjectRisk: risk.isProjectRisk,
            workstream: risk.workstream,
            commentary: risk.commentary,
            approachId: risk.approachId,
            impactId: risk.impactId,
            likelihoodId: risk.likelihoodId,
            owner: risk.owner
        });

        risk.score = ko.computed(function () {
            var impId = ko.utils.unwrapObservable(this.impactId);
            var likeId = ko.utils.unwrapObservable(this.likelihoodId);
            
            return impactScore(impId) * likelihoodScore(likeId);
        }, risk);

        risk.rag = ko.computed(function () {
            var sc = this.score();

            if (sc <= 5) {
                return "ragGreen";
            }
            if (sc >= 15) {
                return "ragRed";
            }

            return "ragAmber";
        }, risk);

        risk.updateFromDto = function(dto) {
            if (dto) {
                risk.id(dto.id || 0);
                risk.riskNumber(dto.riskNumber || "");
                risk.version(dto.version || "");
                risk.description(dto.description);
                risk.raisedDate(dto.raisedDate.substring(0,10));
                risk.raisedBy(dto.raisedBy);
                risk.rifCategoryId(dto.rifCategoryId);
                risk.isProjectRisk(dto.isProjectRisk);
                risk.workstream(dto.workstream);
                risk.commentary(dto.commentary);
                risk.approachId(dto.approachId);
                risk.impactId(dto.impactId);
                risk.likelihoodId(dto.likelihoodId);
                risk.owner(dto.owner);
                risk.isActive(dto.isActive);
            }
        };

        risk.updateFromDto(riskData);

        return risk;
    };

    var newRisk = function() {
        var newRiskVm = riskViewModel();

        newRiskVm.description("There is a risk that \nbecause \nleading to ");
        newRiskVm.raisedDate(moment().format("YYYY-MM-DD"));

        risks.selected(newRiskVm);
    };

    
    var activate = function (idParam) {

        var id = idParam.id;
        
        projectId = id;
    
        var getProjectDetails = function() {
            return backend.getProjectDetails(id).done(function(data) {
                logger.log("Retrieved project details", null, null, false);
                projectCode(data.code);
                projectName(data.name);
            });
        };

        return $.when(
            getProjectDetails(),
            refreshRisks(id)
        ).fail(function () {
            logger.logError("Failed to retrieve all required data", arguments, null, false);
            logger.logError("Could not retrieve the data", null, null, true);
        });
    };

    var viewAttached = function(view) {
        $("#riskTable tbody").on("click", "tr", function(event) {
            risks.selected(ko.dataFor(this.firstElementChild));
        });
    };

    var canSave = function() {
        var risk = risks.selected();

        return risk && risk.validation.isValid;
    };

    var refreshRisk = function(risk) {
        if (!risk) {
            return;
        }

        var found = false;

        $.each(risks.data(), function(index, r) {
            if (r.id() == risk.id) {
                found = true;

                if (activeRisks() != null && activeRisks() != r.isActive()) {

                    risks.remove(r);
                } else {

                    r.updateFromDto(risk);
                }


                return false;
            }

            return true;
        });
        
        if (!found) {
            risks.data.push(riskViewModel(risk));
        }
    };

    var save = function() {

        var riskVm = risks.selected();

        if (riskVm == null) {
            return;
        }

        var risk = {
            description: riskVm.description(),
            raisedDate: riskVm.raisedDate(),
            raisedBy: riskVm.raisedBy(),
            rifCategoryId: riskVm.rifCategoryId(),
            isProjectRisk: riskVm.isProjectRisk(),
            workstream: riskVm.workstream(),
            approachId: riskVm.approachId(),
            likelihoodId: riskVm.likelihoodId(),
            impactId: riskVm.impactId(),
            impactCommentary: riskVm.commentary(),
            isActive:true,
        };
        
        if (riskVm.id() != 0) {
            risk.id = riskVm.id();
            risk.version = riskVm.version();
            isActive:riskVm.isActive();
        }

        backend.saveRisk(projectId, risk).done(function (data, status, jqxhr) {
            if (data != null) {
                refreshRisk(data);
            }
        });
        
    };
    
    var vm = {
        projectCode: projectCode,
        projectName: projectName,
        approaches: approaches,
        impacts: impacts,
        likelihoods: likelihoods,
        rifCategories: rifCategories,
        risks: risks,
        riskListTemplate: 'riskListTemplate',

        viewAttached: viewAttached,
        activate: activate,
        newRisk: newRisk,
        refreshRisks: refreshRisks,
        canSave: canSave,
        save: save
    };
    
    return vm;
});