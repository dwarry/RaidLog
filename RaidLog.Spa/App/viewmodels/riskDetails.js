define(["require", "exports", "services/dataService"], function(require, exports, __dataService__) {
    var dataService = __dataService__;
    

    var refData;

    dataService.getReferenceData().done(function (rd) {
        refData = rd;
    });

    function impactScore(impactId) {
        var result = 0;

        $.each(refData.impacts, function (i, impact) {
            if (impact.id === impactId) {
                result = impact.score;
                return false;
            }
            return true;
        });

        return result;
    }

    function likelihoodScore(likelihoodId) {
        var result = 0;

        $.each(refData.likelihoods, function (i, likelihood) {
            if (likelihood.id === likelihoodId) {
                result = likelihood.score;
                return false;
            }
            return true;
        });

        return result;
    }

    var RiskDetails = (function () {
        function RiskDetails(item, projectId, newItemCallback) {
            var _this = this;
            this.projectId = projectId;
            this.newItemCallback = newItemCallback;
            this.riskNumber = ko.observable(0);
            this.description = ko.observable("").extend({ required: true, maxLength: 2048 });
            this.raisedDate = ko.observable(moment().local().format("YYYY-MM-DD")).extend({ required: true, dateISO: true });
            this.raisedBy = ko.observable("").extend({ required: true, maxLength: 50 });
            this.rifCategoryId = ko.observable().extend({ required: true });
            this.isProjectRisk = ko.observable(true);
            this.workstream = ko.observable("").extend({ required: true, maxLength: 50 });
            this.commentary = ko.observable("").extend({ maxLength: 2048 });
            this.approachId = ko.observable(null).extend({ required: true });
            this.impactId = ko.observable(null).extend({ required: true });
            this.likelihoodId = ko.observable(null).extend({ required: true });
            this.owner = ko.observable("").extend({ maxLength: 50 });
            this.isActive = ko.observable(true);
            this.score = ko.computed(function () {
                return impactScore(_this.impactId()) * likelihoodScore(_this.likelihoodId());
            }, this);

            this.rag = ko.computed(function () {
                var sc = _this.score();

                if (sc <= 5) {
                    return "ragGreen";
                }
                if (sc >= 15) {
                    return "ragRed";
                }

                return "ragAmber";
            });

            this.validation = ko.validatedObservable([
                this.riskNumber,
                this.description,
                this.raisedDate,
                this.raisedBy,
                this.rifCategoryId,
                this.isProjectRisk,
                this.workstream,
                this.commentary,
                this.approachId,
                this.impactId,
                this.likelihoodId,
                this.owner,
                this.isActive
            ]);

            this.updateFromItem(item);

            this.canSave = ko.computed(function () {
                return _this.validation.isValid();
            }, this);

            this.canDelete = ko.computed(function () {
                return _this.id !== 0;
            });
        }
        Object.defineProperty(RiskDetails.prototype, "isNewItem", {
            get: function () {
                return this.id === 0;
            },
            enumerable: true,
            configurable: true
        });

        RiskDetails.prototype.updateFromItem = function (item) {
            if (item == null) {
                this.id = 0;
                this.version = "";
                this.riskNumber(null);
                this.description("");
                this.raisedDate(moment().format("YYYY-MM-DD"));
                this.raisedBy("");
                this.rifCategoryId(null);
                this.isProjectRisk(true);
                this.workstream("");
                this.commentary("");
                this.approachId(null);
                this.impactId(null);
                this.likelihoodId(null);
                this.owner("");
            } else {
                this.id = item.id;
                this.version = item.version;
                this.riskNumber(item.riskNumber);
                this.description(item.description);
                this.raisedDate(item.raisedDate.substring(0, 10));
                this.raisedBy(item.raisedBy);
                this.rifCategoryId(item.rifCategoryId);
                this.isProjectRisk(item.isProjectRisk);
                this.workstream(item.workstream);
                this.commentary(item.commentary);
                this.approachId(item.approachId);
                this.impactId(item.impactId);
                this.likelihoodId(item.likelihoodId);
                this.owner(item.owner);
            }
        };

        RiskDetails.prototype.saveItem = function () {
            var _this = this;
            var dto = {
                description: this.description(),
                raisedDate: this.raisedDate(),
                raisedBy: this.raisedBy(),
                rifCategoryId: this.rifCategoryId(),
                isProjectRisk: this.isProjectRisk(),
                workstream: this.workstream(),
                commentary: this.commentary(),
                approachId: this.approachId(),
                impactId: this.impactId(),
                likelihoodId: this.likelihoodId(),
                owner: this.owner()
            };

            var isNewItem = this.isNewItem;

            if (!isNewItem) {
                dto['id'] = this.id;
                dto['version'] = this.version;
            }

            debugger;

            return dataService.saveRisk(this.projectId, dto).done(function (data) {
                _this.updateFromItem(data);

                if (isNewItem) {
                    _this.newItemCallback(_this);
                }
            });
        };
        return RiskDetails;
    })();

    
    return RiskDetails;
});
