define(["require", "exports", "plugins/http", "services/logger"], function(require, exports, __http__, __logger__) {
    var http = __http__;
    var logger = __logger__;

    var referenceData;

    var refDataDfd = http.get('/api/ReferenceData/').done(function (data) {
        referenceData = data;
        logger.log("Retrieved reference data", {}, "services/dataService", true);
    }).fail(function (jqxhr, status, err) {
        logger.logError("Could not retrieve reference data (" + status + ")", arguments, "services/dataService", true);
    });

    function getReferenceData() {
        return refDataDfd;
    }
    exports.getReferenceData = getReferenceData;

    function getProjects() {
        return http.get('/api/project/').done(function (data) {
            logger.log("Retrieved Projects", data, "services/dataService", true);
        }).fail(function (jqxhr, status, ex) {
            logger.logError("Could not retrieve Projects", arguments, "services/dataService", true);
        });
    }
    exports.getProjects = getProjects;
});
