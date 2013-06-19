define(function() {
    return {
        routes: [
            {
                url: 'projects',
                moduleId: 'viewmodels/projectList',
                visible: true,
                name: "Projects"
            },
            {
                url: 'projects/:id/risks',
                moduleId: 'viewmodels/riskList',
                visible: false,
                name: "Project Risks"

            }
        ],
    };
});