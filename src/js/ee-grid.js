var eeGrid = (function () {

    var methods = {
        init: init
    };

    function init(elementId, colDef) {
        return new Grid(elementId, colDef);
    }

    var Grid = function (elementId, colDef) {
        this.data = [];
        this.colDef = colDef;
        this.gridElement = document.getElementById(elementId);
        return this;
    };

    Grid.prototype.update = function (data) {
        var _self = this;
        _self.data = data.concat([]);
        var body = document.createElement('TBODY');

        data.forEach(function (item) {
            var row = document.createElement('TR');
            _self.colDef.forEach(function (col) {
                var td = document.createElement('TD');
                var key = col.key, style = col.style || '';
                var content = (typeof key === 'function' ? key(item) : item[key]);
                if (typeof content === 'object') {
                    td.appendChild(content);
                } else {
                    td.innerHTML = content + '';
                }
                // if (style){
                    td.className = style;
                // }
                row.appendChild(td);
            });
            body.appendChild(row);
        });

        this.gridElement.replaceChild(body, this.gridElement.tBodies[0]);
        return this;
    };

    return methods;
}());