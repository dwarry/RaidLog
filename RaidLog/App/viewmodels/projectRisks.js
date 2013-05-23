define(function(require) {
    var backend = require('backend');

    var projectRisks = function(projectId) {
        var self = this;

        self.projectId = projectId;
        self.impacts = ko.observableArray([]);
        self.likelihoods = ko.observableArray([]);
        self.approaches = ko.observableArray([]);
        self.rifCategories = ko.observableArray([]);

        self.risks = ko.observableArray([]);

        self.selectRisk = ko.observable(null);

        self.refresh = function() {
            backend.getProjectRisks(projectId).done(function (data) { self.risks(data); })
                .fail(function (jqxhr, status, err) {
                    // tidy this up!
                    alert(err);
                });
        };

        self.activate = function() {
            self.refresh();
        };
        


        backend.getReferenceData().done(function (refData) {
            self.approaches(refData.approaches);
            self.impacts(refData.impacts);
            self.likelihoods(refData.likelihoods);
            self.rifCategories(refData.rifCategories);
        });

            

    };

});