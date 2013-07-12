define(["require", "exports", "plugins/http", "services/logger"], function(require, exports, __http__, __logger__) {
    var http = __http__;
    var logger = __logger__;

    var referenceData;

    var refDataDfd = http.get('/api/ReferenceData/').done(function (data) {
        referenceData = data;
        logger.logSuccess("Retrieved reference data", {}, "services/dataService", true);
    }).fail(function (jqxhr, status, err) {
        logger.logError("Could not retrieve reference data (" + status + ")", arguments, "services/dataService", true);
    });

    function getReferenceData() {
        return refDataDfd;
    }
    exports.getReferenceData = getReferenceData;

    function getProjects() {
        return http.get('/api/projects/').done(function (data) {
            logger.logSuccess("Retrieved Projects", data, "services/dataService", true);
        }).fail(function (jqxhr, status, ex) {
            logger.logError("Could not retrieve Projects", arguments, "services/dataService", true);
        });
    }
    exports.getProjects = getProjects;

    function saveProject(proj) {
        var options = {
            url: "/api/projects/",
            data: proj,
            dataType: 'json'
        };

        if (proj.id) {
            options.url = options.url + proj.id;
            options.type = "PUT";
        } else {
            options.type = "POST";
        }

        return $.ajax(options).done(function (data, status, jqxhr) {
            logger.logSuccess("Saved Project", null, "services/dataService", true);
        }).fail(function (jqxhr, status, ex) {
            logger.logError("Error saving the Project", {}, "services/dataService", true);
            logger.logError(status + " " + jqxhr.responseText, proj, "services/dataService", false);
        });
    }
    exports.saveProject = saveProject;
});
