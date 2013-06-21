define(['durandal/app',
        'services/backend',
        'services/logger'],
    function (app, backend, logger) {

        var selectedRisk = null;

        var riskId = 0;

        var version = "";

        var riskNumber = ko.observable("");

        var description = ko.observable("").extend({ required: true, maxLength: 2048 });

        var raisedDate = ko.observable("").extend({ required: true, dateISO: true });

        var raisedBy = ko.observable("").extend({ required: true, maxLength: 50 });

        var rifCategoryId = ko.observable(null);

        var rifCategories = [];

        var isProjectRisk = ko.observable(false);

        var workstream = ko.observable("").extend({ required: true, maxLength: 50 });

        var commentary = ko.observable("").extend({ maxLength: 2048 });

        var approachId = ko.observable(null);

        var approaches = [];

        var impactId = ko.observable(null);

        var impacts = [];

        var likelihoodId = ko.observable(null);

        var likelihoods = [];

        var owner = ko.observable("").extend({ maxLength: 50 });

        var isActive = ko.observable(true);

        app.on('selectedRiskChanged').then(function (risk) {
            setSelectedRisk(risk);
        });


        var vm = {
            activate: activate,
            deactivate: deactivate,
            addRisk: addRisk,
            saveRisk: saveRisk,

            projectId : 0,
            riskId: riskId,
            version: version,
            riskNumber: riskNumber,
            description: description,
            raisedDate: raisedDate,
            raisedBy: raisedBy,
            rifCategoryId: rifCategoryId,
            rifCategories: rifCategories,
            isProjectRisk: isProjectRisk,
            workstream: workstream,
            commentary: commentary,
            approachId: approachId,
            approaches: approaches,
            impactId: impactId,
            impacts: impacts,
            likelihoodId: likelihoodId,
            likelihoods: likelihoods,
            owner: owner,
            isActive: isActive,
            validation: ko.validatedObservable({
                description: description,
                raisedDate: raisedDate,
                raisedBy: raisedBy,
                rifCategoryId: rifCategoryId,
                isProjectRisk: isProjectRisk,
                workstream: workstream,
                commentary: commentary,
                approachId: approachId,
                impactId: impactId,
                likelihoodId: likelihoodId,
                owner: owner
            })
        };

        return vm;
        
        function activate() {
            
        }
        
        function deactivate() {
            
        }
        
        function setSelectedRisk(risk) {

            if (risk) {

                riskId = risk.id;
                version = risk.version;

                description(risk.description());
                raisedDate(risk.raisedDate());
                raisedBy(risk.raisedBy());
                rifCategoryId(risk.rifCategoryId());
                isProjectRisk(risk.isProjectRisk());
                workstream(risk.workstream());
                commentary(risk.commentary());
                approachId(risk.approachId());
                impactId(risk.impactId());
                likelihoodId(risk.likelihoodId());
                owner(risk.owner());
                isActive(risk.isActive);
            } else {
                addRisk();
            }
        }
        
        function addRisk() {
            riskId = 0;
            version = "";

            description("");
            raisedDate("");
            raisedBy("");
            rifCategoryId(null);
            isProjectRisk(true);
            workstream("");
            commentary("");
            approachId(null);
            impactId(null);
            likelihoodId(null);
            owner("");
        }

        function saveRisk() {
            var risk = {
                description: description(),
                raisedDate: raisedDate(),
                raisedBy: raisedBy(),
                rifCategoryId: rifCategoryId(),
                isProjectRisk: isProjectRisk(),
                workstream: workstream(),
                approachId: approachId(),
                likelihoodId: likelihoodId(),
                impactId: impactId(),
                impactCommentary: commentary()
            };
            
            if (riskId !== 0) {
                risk.id = riskId;
                risk.version = version;
            }

            backend.saveRisk(this.projectId, risk)
                .done(function (data, status, jqxhr) {
                    var loc = jqxhr.getResponseHeader('Location');
                    if (loc) {
                        backend.getRisk(loc).done(newOrUpdatedRisk);
                    } else {
                        newOrUpdatedRisk(data);
                    }

                }).fail(function(jqxhr, status, ex) {
                app.showMessage("Could not save the Risk", "Oh dear");
            });
        }
        
        function newOrUpdatedRisk(risk) {
            app.trigger("newOrUpdatedRisk", risk);
        }
    });