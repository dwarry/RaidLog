define(['services/logger'], function(logger) {
    var referenceData = {};

    var refDataDfd = $.getJSON("/api/ReferenceData/").done(function (result) {
        referenceData = result;
    }).fail(function(jqxhr, status, err) {
        logger.logError("Error retrieving reference data.",null,null, true);
    });

    // Singleton object that returns Deferreds that will yield the data when resolved. 
    // Clients must attach their own .done() handlers to process the results.
    return {
        'getProjects': function(observableArray) {
            return $.getJSON('/api/project/')
                .done(function (data) {
                    if (observableArray) {
                        observableArray(data);
                    }
                })
                .fail(function(jqxhr, status, err) {
                    logger.logError("Could not retrieve Projects", null, null, true);
                });
        },
        
        'getProjectDetails': function(id) {
            return $.getJSON("/api/project/" + id);
        },
        
        'getProjectRisks': function(id) {
            return $.getJSON("/api/project/" + id + "/risks/");
        },
        
        'getProjectAssumptions': function(id) {
            return $.getJSON("/api/project/" + id + "/assumptions/");
        },
        
        'getProjectIssues': function(id) {
            return $.getJSON("/api/project/" + id + "/issues/");
        },
        
        'getProjectDependencies': function(id) {
            return $.getJSON("/api/project/" + id + "/dependencies/");
        },
        
        'getProjectQueries': function(id) {
            return $.getJSON("/api/project/" + id + "/queries/");
        },

        // gets the reference data
        'getReferenceData': function() {

            return refDataDfd;
        },
        
        'saveProject': function(proj) {

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
                .done(function(data) {
                    logger.log("Saved Project", null, "backend", true);
                })
                .fail(function (jqxhr, status, ex) {
                    logger.logError(status + " " + jqxhr.responseText, proj, "backend", false);
                    logger.logError("Error saving the Project");
                });
        },
    };

    function logError(jqxhr, status, err) {
        
    }

    
});