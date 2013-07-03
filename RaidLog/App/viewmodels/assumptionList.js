define(function(require) {
    var backend = require("services/backend");

    var logger = require("services/logger");

    var mapping = {
        key: function (x) {
            return ko.utils.unwrapObservable(x).id;
        },
        create: function (options) {

            return assumptionViewModel(options.data);
        }
    };

    var assumptionViewModel = function(assumptionData) {
        var assumption = {
            id: 0,
            version: "",
            
            assumptionNumber: ko.observable(""),
            description: ko.observable("").extend({ maxLength: 2048, required: true }),
            workstream: ko.observable("").extend({ maxLength: 50, required: true }),
            owner: ko.observable("").extend({ maxLength: 50 }),
            validatedBy: ko.observable("").extend({ maxLength: 50 }),
            status: ko.observable("").extend({ maxLength: 50,required:true }),
            supportingDocumentation: ko.observable("").extend({ maxLength: 512 })
                
           
        };

        assumption.validation = ko.validatedObservable({
            description: assumption.description,
            workstream: assumption.workstream,
            owner: assumption.owner,
            validatedBy: assumption.validatedBy,
            status: assumption.status,
            supportingDocumentation: assumption.supportingDocumentation
        });

        assumption.updateFromDto = function(dto) {
            assumption.id = dto.id;
            assumption.version = dto.version;
            assumption.assumptionNumber(dto.assumptionNumber || "");
            assumption.description(dto.description || "");
            assumption.workstream(dto.workstream || "");
            assumption.owner(dto.owner || "");
            assumption.validatedBy(dto.validatedBy || "");
            assumption.status(dto.status || "");
            assumption.supportingDocumentation(dto.supportingDocumentation || "");
        };

        return assumption;
    };

    var refreshAssumptions = function(vm) {
        var getAssumptions = backend.getAssumptions(vm.projectId).done(
            function(data) {
                logger.log("Retrieved assumptions", data, "assumptionsList", false);

                ko.mapping.fromJS(data, mapping, this.assumptions.data);
            }).fail(function(jqxhr, status, ex) {
                logger.logError("Error retrieving Assumptions: " + status, ex, "assumptionList", false);
                logger.logError("Could not retrieve Assumptions", null, "assumptionList", true);
            }
            );

        return getAssumptions;
    };

    var ctor = function() {
        this.projectId = 0;
        this.projectCode = ko.observable("");
        this.projectName = ko.observable("");

        this.assumptions = ko.simpleGrid.viewModel({ data: ko.observableArray([]), pageSize: 10 });

        this.canSave = ko.computed(function() {
            var selected = this.assumptions.selected();

            return selected && selected.validation.isValid();
        }, this);
    };

    ctor.prototype.activate = function(projectIdParam, stateParam) {
        var projectId = projectIdParam.id;
        var state = stateParam.state;

        this.projectId = projectId;
        this.state = state;
        
        var retrieveProject = backend.getProjectDetails(this.projectId)
            .done(function (data) {
                    this.projectCode(data.code);
                    this.projectName(data.name);
            })
            .fail(function(jqxhr, status, ex) {
                 logger.logError("Could not retrieve Project details", "", "assumptionList", true);
            });

        return $.when(retrieveProject, refreshAssumptions(this));
    };
    
    ctor.prototype.viewAttached = function (view) {
        $("#assumptionTable tbody").on("click", "tr", function (event) {
            assumptions.selected(ko.dataFor(this.firstElementChild));
        });
    };

    ctor.prototype.newAssumption = function() {
        var newAssumption = assumptionViewModel();
        assumptions.selected(newAssumption);
    };

    ctor.prototype.refresh = function() {
        return refreshAssumptions(this);

    };

    ctor.prototype.save = function() {
        var that = this;
        var selected = this.assumptions.selected();

        var assumption = {
            description: selected.description(),
            workstream: selected.workstream(),
            owner: selected.owner(),
            validatedBy: selected.validatedBy(),
            status: selected.status,
            supportingDocumentation: selected.supportingDocumentation()
        };

        if (selected.id !== 0) {
            assumption.id = selected.id;
            assumption.version = selected.version;
        }

        return backend.saveAssumption(assumption).done(
            function(data) {
                logger.log("Saved Assumption", "", "assumptionsList", true);
                refreshAssumptions(that);
            }).fail(function(jqxhr, state, ex) {
                logger.logError("Could not save Assumption", ex, "assumptionsList", true);
            });
    };

    return ctor;
    
    
});