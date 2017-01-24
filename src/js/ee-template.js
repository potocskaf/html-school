var eeTemplate = (function(eeUtil){
    var methods = {
        get:get
    };

    var cache = {};

    function get(url, callback){
        if (cache[url]){
            callback(cache[url]);
        }else{
            eeUtil.getHTML(url, function(d){
                cache[url] = d;
                callback(d);
            }, eeUtil.noop);
        }
    }

    return methods;
}(eeUtil));