var eeUtil = (function (eeUtil) { //todo take apart

    eeUtil.getHTML = getHTML;
    eeUtil.getJson = getJson;
    eeUtil.toggleClass = toggleClass;
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

    function getHTML(url, successCallback, errorCallback) {
        HttpRequest(url, 'GET', successCallback, errorCallback);
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

    function toggleClass(element, className, add) { //todo fix leaves empty class attr
        element.className = element.className.split(new RegExp(' ?' + className)).join('') + (add ? ' ' + className : '');
    }

    function noop(a) {
        return a;
    }

    return eeUtil;
}(eeUtil || {}));



