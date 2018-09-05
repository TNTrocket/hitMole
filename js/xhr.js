define(function (require) {
    var $ = require("jquery");
    var basicUrl = "/ntce-c";

    function apiCall(opitions, successCallback, errorCallback) {
        opitions.type = opitions.type || 'POST';
        opitions.headers = opitions.headers || {};
        opitions.url = basicUrl + opitions.url;
        opitions.headers["Accept"] = opitions.headers["Accept"] || "application/json";
        opitions.contentType = opitions.contentType || 'application/x-www-form-urlencoded; charset=UTF-8';
        if (opitions.contentType === "application/json" && opitions.contentType === 'POST') {
            opitions.data = JSON.stringify(opitions.data);
        }
        $.ajax(opitions).done(function (data, textStatus, jqXHR) {
            if (data.code !== 10000) {
                if (data.msg) {
                    alert(data.msg)
                    errorCallback(jqXHR, textStatus);
                }
            } else {
                (successCallback || $.noop)(data.data, textStatus, jqXHR);
            }

        }).fail(function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 401) {

            } else if (jqXHR.status >= 500) {

            }
            if (typeof errorCallback == "function") {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        })
    }

    function call(options) {
        var deferred = $.Deferred();
        apiCall(options, function (data) {
            deferred.resolve(data);
        }, function (jqXHR, textStatus, errorThrown) {
            deferred.reject(jqXHR, textStatus, errorThrown);
        });
        return deferred.promise();
    }

    return {
        call: call
    }
});