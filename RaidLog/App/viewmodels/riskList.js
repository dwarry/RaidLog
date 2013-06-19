define(function (require) {
    var backend = require("services/backend");

    var logging = require("services/logger");

    var app = require("durandal/app");

    var riskDetailsVm = require("viewmodels/riskDetails");

    var that = this;

    var activeRisks = ko.observable(true);

    var projectId = 0;
    
    var projectCode = ko.observable("");

    var projectName = ko.observable("");

    var approaches = ko.observableArray([]);

    var impacts = ko.observableArray([]);

    var impactScore = function(impactId) {
        var score = 0;

        $.each(impacts, function(index, impact) {
            if (impact.id == impactId) {
                score = impact.score;
                return false;
            }
            return true;
        });

        return score;
    };

    var likelihoods = ko.observableArray([]);

    var likelihoodScore = function(likelihoodId) {
        var score = 0;
        
        $.each(likelihoods, function (index, likelihood) {
            if (likelihood.id == likelihoodId) {
                score = likelihood.score;
                return false;
            }
            return true;
        });

        return score;
    };

    var rifCategories = ko.observableArray([]);

    var risks = ko.observableArray([]);

    var selected = ko.observableArray([]);

    var selectedIndex = ko.computed(
        {
            read: function() {
                      return selected.length > 0 ? risks.indexOf(selected()[0]) : -1;
                  },
            write: function (value) {
                if (value < 0 || value >= risks.length) {
                    selected([]);
                } else {
                    selected([ risks()[value] ]);
                }
            }
        }, this);

    
    var selectedRisk = ko.computed( function() {
        return selected.length > 0 ? selected()[0] : null;
    });
    
    
    var riskMapping = {
        create: function (options) {
            options.data.score = ko.computed(function () {
                return impactScore(this.impactId) * likelihoodScore(this.likelihoodId);
            }, options.data);
        }
    };

    var refreshRisks = function(id) {
        return backend.getProjectRisks(id, activeRisks()).done(function(data) {
            logging.log("Retrieved risks", null, null, false);

            

            risks(ko.mapping.fromJS(data, riskMapping));
        });
    };


    var activeRiskSubscription = null;

    var selectedRiskSubscription = null;

    var onNewOrUpdatedRisk = function (risk) {
        if (!risk) {
            return;
        }

        var found = false;

        $.each(risks, function(r) {
            if (r.id == risk.id) {

                found = true;

                if (!risk.isActive && !activeRisks()) {
                    risks.remove(r);
                } else {
                    r.version(risk.version);
                    r.riskNumber(riskNumber);
                    r.description(description);
                    r.raisedDate(raisedDate);
                    r.raisedBy(raisedBy);
                    r.rifCategoryId(rifCategoryId);
                    r.rifCategories(rifCategories);
                    r.isProjectRisk(isProjectRisk);
                    r.workstream(workstream);
                    r.commentary(commentary);
                    r.approachId(approachId);
                    r.impactId(impactId);
                    r.likelihoodId(likelihoodId);
                    r.owner(owner);
                    r.isActive(isActive);
                }

                return false;
            }
            
            return true;
        });
        
        if (!found) {
            ko.mapping.fromJS(risk, riskMapping);
            risks.push(risk);
        }
    };

    var activate = function (idParam) {

        var id = idParam.id;
        
        projectId = id;

        riskDetailsVm.projectId = id;

        activeRiskSubscription = activeRisks.subscribe(refreshRisks);

        selectedRiskSubscription = selectedRisk.subscribe(function(newValue) {
            app.trigger('selectedRiskChanged', newValue);
        });

        app.on('newOrUpdatedRisk', onNewOrUpdatedRisk, that);

    
        var getProjectDetails = function() {
            return backend.getProjectDetails(id).done(function(data) {
                logging.log("Retrieved project details", null, null, false);
                projectCode(data.code);
                projectName(data.name);
            });
        };

        return $.when(
            getProjectDetails(),
            refreshRisks(id)
        ).fail(function () {
            logging.logError("Failed to retrieve all required data", arguments, null, false);
            logging.logError("Could not retrieve the data", null, null, true);
        });
    };

    var deactivate = function() {
        activeRiskSubscription.dispose();
        activeRiskSubscription = null;

        selectedRiskSubscription.dispose();
        selectedRiskSubscription = null;

        app.off('newOrUpdatedRisk', onNewOrUpdatedRisk, that);
    };

    
    

    
    var vm = {
        activate: activate,
        deactivate: deactivate,
        projectCode: projectCode,
        projectName: projectName,
        approaches: approaches,
        impacts: impacts,
        likelihoods: likelihoods,
        rifCategories: rifCategories,
        risks: risks,
        selection: selected,
        selectedIndex: selectedIndex,
        selectedRisks: selected,
        selectedRisk: selectedRisk,
        riskDetailsVm: riskDetailsVm
    };

    return vm;
});