var eeForms = (function (eeUitl) {

    var methods = {
        addPerson: function(){
            return new FormHandler(forms.addPerson);
        }
    };

    var forms = {
        addPerson: [
            {key:'name', selector:'person-name'},
            {key:'job', selector:'person-job'},
            {key:'age', selector:'person-age', processFn: function(element){
                return element.value + '';
            }},
            {key:'nick', selector:'person-nick'},
            {key:'employee', selector:'person-employee', processFn: function (element) {
                return element.checked;
            }}
        ]
    };

    var FormHandler = function (cfg) {
        cfg = cfg.concat([]);
        cfg.forEach(function(d){
            d.element = document.getElementById(d.selector);
            d.processFn = d.processFn || defaultProcessFn;
        });
        this.cfg = cfg;
        function defaultProcessFn(element){
            return element.value;
        }
        return this;
    };

    FormHandler.prototype.collect = function () {
        var result = {};
        this.cfg.forEach(function (d) {
            result[d.key] = d.processFn(d.element);
        });
        return result;
    };

    return methods;
}(eeUtil));