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
        this.thElements = this.gridElement.getElementsByTagName('th');
        this.sortMap = {
            'none': 'desc',
            'desc': 'asc',
            'asc': 'none'
        };
        return this;
    };


    Grid.prototype.sortCol = function (colIndex, dataFn) {
        var sortDir = this.colDef[colIndex].sortDir = this.sortMap[this.colDef[colIndex].sortDir || 'none'];
        var thElement = this.thElements[colIndex] || {};
        thElement._className = thElement._className || thElement.className;
        thElement.className = thElement._className + ' ' + sortDir;
        dataFn = dataFn || eeUtil.noop;

        this._sort = {
            sortDir: sortDir,
            dataFn: dataFn
        };

        sortGrid(this);
        this.update();
    };

    Grid.prototype.update = function (data) {
        var _self = this;
        if (data) {
            _self.data = data.concat([]);
            _self._data = _self.data.concat([]);
        }
        sortGrid(_self);
        var body = document.createElement('TBODY');

        this.data.forEach(function (item) {
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

    function sortGrid(grid) {
        if (!grid._sort) {
            return;
        }

        var cfg = grid._sort;

        if (cfg.sortDir === 'none') {
            grid.data = grid._data.concat([]);
        } else if (cfg.sortDir === 'asc') {
            grid.data.sort(function (a, b) {
                return cfg.dataFn(a) < cfg.dataFn(b) ? 1 : -1;
            });
        } else {
            grid.data.sort(function (a, b) {
                return cfg.dataFn(a) > cfg.dataFn(b) ? 1 : -1;
            });
        }
    }

    return methods;
}());