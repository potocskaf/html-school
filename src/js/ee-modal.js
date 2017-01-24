var eeModal = (function (eeUtil) {
    var body, modal;

    var methods = {
        open: open
    };

    function open(tpl) {
        body = document.getElementsByTagName('BODY')[0];
        if (modal) {
            return modal;
        }
        modal = new Modal(tpl);
        return modal;
    }

    var Modal = function (tpl) {
        var _self = this;
        var container = document.createElement('DIV');
        container.className = 'ee-modal-container';
        var bg = document.createElement('DIV');
        bg.className = 'ee-modal-bg';
        var modalView = document.createElement('DIV');
        modalView.className = 'ee-modal';

        bg.addEventListener('click', function () { //todo flag in cfg?
            _self.close();
        });

        modalView.innerHTML = tpl;
        container.appendChild(bg);
        container.appendChild(modalView);
        body.appendChild(container);
        eeUtil.toggleClass(body, 'ee-modal-open', true);
        this.container = container;
        return this;
    };

    Modal.prototype.close = function () {
        body.removeChild(this.container);
        eeUtil.toggleClass(body, 'ee-modal-open', false);
        modal = undefined;
    };

    return methods;
}(eeUtil));