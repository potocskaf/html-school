var eeUtil = (function (eeUtil) {

    eeUtil.getJson = getJson;
    eeUtil.noop = noop;

    function getJson(url, successCallback, errorCallback) {
        HttpRequest(url, 'GET', function (data) {
            try {
                data = JSON.parse(data);
            }catch (e){
                errorCallback(e.message);
                return;
            }
            successCallback(data);
        }, errorCallback);
    }

    function HttpRequest(url, method, successCallback, errorCallback, data) {
        var httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState === 4) {
                if (httpRequest.status === 200) {
                    successCallback(httpRequest.responseText);
                } else {
                    errorCallback(httpRequest.responseText);
                }
            }
        };
        httpRequest.open(method || 'GET', url);
        httpRequest.send(data);
    }

    function noop(a) {
        return a;
    }

    return eeUtil;
}(eeUtil || {}));



