define(['services/logger','durandal/app'], function(logger,app) {
    var referenceData = {};

    var refDataDfd = $.getJSON("/api/ReferenceData/").done(function (result) {
        referenceData = result;
    }).fail(function(jqxhr, status, err) {
        logger.logError("Error retrieving reference data.",null,null, true);
    });

    // Singleton object that returns Deferreds that will yield the data when resolved. 
    // Clients must attach their own .done() handlers to process the results.
    return {
        getProjects: function() {
            return $.getJSON('/api/project/');
        },
        
        getProjectDetails: function(id) {
            return $.getJSON("/api/project/" + id);
        },
        
        // id - project id
        // active - true for open risks, false for closed, null for both.
        getProjectRisks: function(id, active) {
            return $.getJSON("/api/project/" + id + "/risks/", {active:active});
        },
        
        getProjectAssumptions: function(id) {
            return $.getJSON("/api/project/" + id + "/assumptions/");
        },
        
        getProjectIssues: function(id) {
            return $.getJSON("/api/project/" + id + "/issues/");
        },
        
        getProjectDependencies: function(id) {
            return $.getJSON("/api/project/" + id + "/dependencies/");
        },
        
        getProjectQueries: function(id) {
            return $.getJSON("/api/project/" + id + "/queries/");
        },

        // gets the reference data
        getReferenceData: function() {

            return refDataDfd;
        },
        
        getRisk: function (idOrUrl) {

            var url = $.isNumeric(idOrUrl) ? "/api/risks/" + idOrUrl : idOrUrl;

            return $.getJSON(url);
        },
        
        saveProject: function(proj) {

            var options = {
                url: "/api/project/",
                data: proj,
                dataType: 'json'
            };

            if (proj.id) {
                options.url = options.url + proj.id;
                options.type = "PUT";
            } else {
                options.type = "POST";
            }

            return $.ajax(options)
                .done(function(data, status, jqxhr) {
                    logger.log("Saved Project", null, "backend", true);
                })
                .fail(function (jqxhr, status, ex) {
                    logger.logError(status + " " + jqxhr.responseText, proj, "backend", false);
                    logger.logError("Error saving the Project");
                });
        },
        
        saveRisk: function(projectId, risk) {
            var options = {
                data: risk,
            };

            if ('id' in risk) {
                options.url = "/api/risks/" + risk.id;
                options.type = "PUT";
            } else {
                options.url = "/api/project/" + projectId + "/risks/";
                options.type = "POST";
            }


            return $.ajax(options).done(function(data, status, jqxhr) {
                logger.log("Saved Risk", null, null, false);
            }).fail(function(jqxhr, status, ex) {
                logger.logError(status + " " + jqxhr.responseText, risk, "backend", false);
                logger.logError("Error saving the Risk", null, "backend", true);
            });
        }
    };

    function logError(jqxhr, status, err) {
        
    }

    
});