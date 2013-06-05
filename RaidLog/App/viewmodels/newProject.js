define(['services/backend', 'services/logger'], function(backend, logger) {

    var vm = {
        projectId: null,
        
        projectVersion : null,

        projectCode: ko.observable("").extend({ required: true, minLength: 2, maxLength: 16 }),

        projectName: ko.observable("").extend({ required: true, minLength: 2, maxLength: 50 }),
    };

    vm.setProject = function (project) {
        if (!project) {
            vm.projectId = null;
            vm.projectVersion = null;
            vm.projectCode("");
            vm.projectName("");
        } else {
            vm.projectId = project.id;
            vm.projectVersion = project.version;
            vm.projectCode(project.code);
            vm.projectName(project.name);
        }
    };

    vm.activate = function() {
    
    },

    vm.validation = ko.validatedObservable({
        projectCode: vm.projectCode,
        projectName: vm.projectName
    });
    
    vm.save = function () {

        var proj = { code: vm.projectCode(), name: vm.projectName() };
        
        if (vm.projectId) {
            proj.id = vm.projectId;
        }

        backend.saveProject(proj)
            .done(function () { vm.modal.close(true); })
            .fail(function () { vm.modal.close(false); });

    };

    vm.cancel = function() {
        vm.modal.close(false);
    };

    return vm;
});