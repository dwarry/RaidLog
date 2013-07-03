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
                url: 'projects/:id/risks/:state',
                moduleId: 'viewmodels/riskList',
                visible: false,
                name: "Project Risks"

            },
            {
                url: 'projects/:id/assumptions/:state',
                moduleId: 'viewmodels/assumptionList',
                visible: false,
                name: "Project Assumptions"

            },
            {
                url: 'projects/:id/issues/:state',
                moduleId: 'viewmodels/issueList',
                visible: false,
                name: "Project Issues"

            },
            {
                url: 'projects/:id/dependencies/:state',
                moduleId: 'viewmodels/dependencyList',
                visible: false,
                name: "Project Dependencies"

            },
            {
                url: 'projects/:id/risks/:state',
                moduleId: 'viewmodels/queryList',
                visible: false,
                name: "Project Queries"

            }
        ],
    };
});