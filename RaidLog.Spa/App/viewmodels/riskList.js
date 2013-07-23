define(["require", "exports", "viewmodels/pagedGrid"], function(require, exports, __pg__) {
    
    
    var pg = __pg__;

    var RiskList = (function () {
        function RiskList() {
            this.title = ko.observable("");
            this.listViewModel = new pg.ListViewModel();
        }
        return RiskList;
    })();

    
    return RiskList;
});
