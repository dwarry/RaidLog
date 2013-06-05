﻿define(function() {
    return {
        routes: [
            {
                url: 'projects',
                moduleId: 'viewmodels/projectList',
                visible: true,
                name: "Projects"
            },
            {
                url: 'projects/:id',
                moduleId: 'viewmodels/projectDetails',
                visible: false,
                name: "Project Details"

            }
        ],
    };
});