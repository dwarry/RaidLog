define(function (require) {
    var backend = require("services/backend");

    var activate = function(projectId) {
        return backend.getProjectRisks(id).then(function(data) {

        });
    };

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



    return {
        activate: activate,
        risks: risks,
        selection: selected,
        selectedIndex: selectedIndex,
        selectedRisk: selectedRisk
    };
});