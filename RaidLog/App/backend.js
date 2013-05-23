define(function() {
    var referenceData = {};

    var refDataDfd = $.get("/api/ReferenceData/").done(function (results) {
        referenceData = result;
    });

    // Singleton object that returns Deferreds that will yield the data when resolved. 
    // Clients must attach their own .done() handlers to process the results.
    return {
        'getProjects': function() {
            return $.get('/api/project/');
        },

        'getProjectDetails': function(id) {
            return $.get("/api/project/" + id);
        },
        
        'getProjectRisks': function(id) {
            return $.get("/api/project/" + id + "/risks");
        },
        
        'getProjectAssumptions': function(id) {
            return $.get("/api/project/" + id + "/assumptions");
        },
        
        'getProjectIssues': function(id) {
            return $.get("/api/project/" + id + "/issues");
        },
        
        'getProjectDependencies': function(id) {
            return $.get("/api/project/" + id + "/dependencies");
        },
        
        'getProjectQueries': function(id) {
            return $.get("/api/project/" + id + "/queries");
        },

        // gets the reference data
        'getReferenceData': function() {

            return refDataDfd;
        }
    };
});