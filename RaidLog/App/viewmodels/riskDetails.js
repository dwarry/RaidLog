define(function(require) {
    var backend = require('backend');
    var app = require('durandal/app');

    var riskDetails = function() {
        var that = this;

        this.displayName = ko.observable("Risk ");

        this.description = 'Allows the user to view/edit details of a Risk.';

        this.projectId = 0;

        this.projectCode = ko.observable("");


        this.isBusy = ko.observable(false);

        this.viewAttached = function(view) {
            that.refresh();
        };

        this.activate = function(activationData) {
            that.projectId = activationData.projectId;
        };

        this.refresh = function() {

            if (that.isBusy()) {
                return;
            }

            that.isBusy(true);

            backend.getdataMethod(that.parentEntityId).then(
                function(result) {
                    that.parentEntityName(result.displayName);
                    that.listData(result.dataProperty);
                    $('#tableId').dataTable(tableOptions);
                    that.isBusy(false);
                },
                function(jqxhr, status, ex) {
                    app.displayAjaxFailureMessage(jqxhr, status, ex);
                    that.isBusy(false);
                });
        };

        this.add = function() {
            if (that.isBusy()) {
                return;
            }
            app.showMessage("Adding new Risk");
        };



    };

    return name;
});