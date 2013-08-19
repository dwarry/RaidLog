/// <reference path="../../Scripts/typings/durandal/durandal.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/knockout.validation/knockout.validation.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
define(["require", "exports", 'plugins/dialog', 'plugins/router', "services/dataService", 'services/routeFactory', './actionDetailsDialog'], function(require, exports, __dlg__, __router__, __ds__, __rf__, __ActionDetailsDialog__) {
    var dlg = __dlg__;
    var router = __router__;
    var ds = __ds__;
    var rf = __rf__;
    var ActionDetailsDialog = __ActionDetailsDialog__;

    var _urgencies = ["Low", "Medium", "High", "Very High"];

    var QueryDetails = (function () {
        function QueryDetails(projectId, dto, _newItemCallback) {
            var _this = this;
            this.projectId = projectId;
            this._newItemCallback = _newItemCallback;
            this.id = ko.observable();
            this.version = null;
            this.queryNumber = ko.observable();
            this.workstream = ko.observable().extend({ required: true, maxLength: 50 });
            this.deliverableImpacted = ko.observable().extend({ required: true, maxLength: 50 });
            this.urgency = ko.observable().extend({ required: true, maxLength: 10 });
            this.urgencies = _urgencies;
            this.description = ko.observable().extend({ required: true, maxLength: 2048 });
            this.raisedBy = ko.observable().extend({ required: true, maxLength: 50 });
            this.raisedTo = ko.observable().extend({ required: true, maxLength: 50 });
            this.raisedDate = ko.observable().extend({ required: true, dateISO: true });
            this.answer = ko.observable().extend({ maxLength: 1024 });
            this.answeredBy = ko.observable().extend({ required: { onlyIf: function () {
                        return (_this.answer() !== null && _this.answer() !== "");
                    } }, maxLength: 50 });
            this.answeredDate = ko.observable().extend({ dateISO: true, required: { onlyIf: function () {
                        return (_this.answer() !== null && _this.answer() !== "");
                    } } });
            this.confirmedInDocuments = ko.observable().extend({ required: { onlyIf: function () {
                        return (_this.answer() !== null && _this.answer() !== "");
                    } }, maxLength: 256 });
            this.canSave = ko.computed(function () {
                return _this.validation.isValid();
            }, this);
            this.isNew = ko.computed(function () {
                return !_this.id();
            }, this);
            if (dto.id) {
                this.validation = ko.validatedObservable([
                    this.workstream,
                    this.deliverableImpacted,
                    this.urgency,
                    this.description,
                    this.raisedTo,
                    this.answer,
                    this.answeredBy,
                    this.answeredDate,
                    this.confirmedInDocuments
                ]);
            } else {
                this.validation = ko.validatedObservable([
                    this.workstream,
                    this.deliverableImpacted,
                    this.urgency,
                    this.description,
                    this.raisedBy,
                    this.raisedTo,
                    this.raisedDate
                ]);
            }

            this.updateFromDto(dto);
        }
        QueryDetails.prototype.updateFromDto = function (dto) {
            this.id(dto.id);
            this.version = dto.version;
            this.projectId = dto.projectId;
            this.queryNumber(dto.queryNumber);
            this.workstream(dto.workstream);
            this.deliverableImpacted(dto.deliverableImpacted);
            this.urgency(dto.urgency);
            this.description(dto.description);
            this.raisedBy(dto.raisedBy);
            this.raisedTo(dto.raisedTo);
            this.raisedDate((dto.raisedDate || "").substring(0, 10));
            this.answer(dto.answer);
            this.answeredBy(dto.answeredBy);
            this.answeredDate((dto.answeredDate || "").substring(0, 10));
            this.confirmedInDocuments(dto.confirmedInDocuments);
        };

        QueryDetails.prototype.save = function () {
            var _this = this;
            var dto;
            dto = {
                workstream: this.workstream(),
                deliverableImpacted: this.deliverableImpacted(),
                urgency: this.urgency(),
                description: this.description()
            };

            if (this.isNew()) {
                var newItem = dto;
                newItem.projectId = this.projectId;
                newItem.raisedBy = this.raisedBy();
                newItem.raisedTo = this.raisedTo();
                newItem.raisedDate = this.raisedDate();
            } else {
                var editItem = dto;
                editItem.id = this.id();
                editItem.version = this.version;
                editItem.raisedTo = this.raisedTo();
                editItem.answer = this.answer();
                editItem.answeredBy = this.answeredBy();
                editItem.answeredDate = this.answeredDate();
                editItem.confirmedInDocuments = this.confirmedInDocuments();
            }

            ds.saveQuery(dto).done(function (data) {
                _this.updateFromDto(data);
                if (newItem) {
                    _this._newItemCallback(_this);
                }
            });
            ;
        };

        QueryDetails.prototype.addAction = function () {
            var action = ds.makeActionDto();
            action.parentItemType = "Query";
            action.parentItemId = this.id();

            var ad = new ActionDetailsDialog(action);

            dlg.show(ad);
        };

        QueryDetails.prototype.showActions = function () {
            var route = rf.makeItemActionLink('query', this.id());

            router.navigate(route);
        };
        return QueryDetails;
    })();

    
    return QueryDetails;
});
