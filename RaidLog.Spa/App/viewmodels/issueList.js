/// <reference path="../../Scripts/typings/durandal/durandal.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/knockout.validation/knockout.validation.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
define(["require", "exports"], function(require, exports) {
    
    
    

    var IssueList = (function () {
        function IssueList() {
        }
        IssueList.prototype.activate = function (projectIdParam) {
            this._projectId = projectIdParam;
        };
        return IssueList;
    })();
});
