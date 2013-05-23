define(function (require) {
    
    var backend = require('backend');

    var projectList = {
        'projects': ko.observableArray([]),
        
        'selectedProject': ko.observable(),
        
        'activate': function () {
            var self = this;
            
            backend.getProjects().then(function (results) {
                self.projects(results);
            });
        },
        
        
        'viewProject' : function(proj){
            
        },
    };


    return projectList;
})