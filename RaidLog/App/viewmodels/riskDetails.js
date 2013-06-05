define(function(require) {
    var backend = require('services/backend');
    var app = require('durandal/app');

    var riskDetails = function() {
        var self = this;

        self.displayName = ko.observable("Risk ");

        self.description = 'Allows the user to view/edit details of a Risk.';

        self.riskId = ko.observable(0);

        self.versionNumber = ko.observable(0);

        self.riskNumber = ko.observable("");

        self.description = ko.observable("");

        self.raisedDate = ko.observable("2013-01-01");

        self.rifCategoryId = ko.observable(0);

        self.isProjectRisk = ko.observable(false);

        self.workstream = ko.observable("");

        self.commentary = ko.observable("");

        self.approach = ko.observable(null);

        self.impact = ko.observable(null);

        self.likelihood = ko.observable(null);

        self.owner = ko.observable("");


        self.approaches = ko.observableArray([]);

        self.impacts = ko.observableArray([]);

        self.likelihoods = ko.observableArray([]);

        self.rifCategories = ko.observableArray([]);
        


        backend.getReferenceData().done(function (refData) {
            self.approaches(refData.approaches);
            self.impacts(refData.impacts);
            self.likelihoods(refData.likelihoods);
            self.rifCategories(refData.rifCategories);
        });
        
    };

    return name;
});