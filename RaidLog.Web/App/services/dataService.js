define(['services/logger', 'durandal/http'], function (logger, http) {
    var referenceData;
    var refDataDfd = http.get('/api/ReferenceData/', {}).done(function (data) {
        referenceData = data;
    }).fail(function (jqxhr, status, err) {
    });
});
