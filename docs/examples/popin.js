
(function ($) {

    var _animationDuration = 500;

    var _initMarkup = function (container, settings) {
        //debugger;
        var html = [];
        var inBody = container.is('body');
         
        html.push('<div class="popin', (inBody ? ' popin-body' : ''), (settings.css ? ' ' + settings.css : ''), '">')
        html.push('<div class="popin-message-wrap', (inBody ? ' popin-message-wrap-body' : ''), '">')
        if (settings.showClose) {
            html.push('<button type="button" class="close" aria-hidden="true">×</button>');
        }
        html.push('<div class="alert alert-', settings.type, ' popin-message', (inBody ? ' popin-message-body' : ''), '">', settings.message, '</div>');
        html.push('</div>', '</div>')
        return html.join('');
    }

    var methods = {

        init: function (options) {

            // Establish our default settings
            var settings = $.extend({
                message: '',
                type: 'info',
                css: '',
                showClose: true,
                autoClose: false
            }, options);

            return this.each(function () {

                var $this = $(this);

                // commit html to document
                var popin = $(_initMarkup($this, settings));
                popin.appendTo($this);

                // add close handler
                popin.find('button.close').click(function () {
                    popin.remove();
                });

                // show
                popin.slideDown(_animationDuration);

                // auto close?
                var delay = 0;
                if (options.autoClose === true) {
                    delay = 3000;
                } else if (options.autoClose > 0) {
                    delay = options.autoClose;
                }
                if (delay > 0) {
                    window.setTimeout(function () {
                        popin.slideUp(_animationDuration, function () {
                            popin.remove();
                        });
                    }, delay);
                }

            });

        }, 

        close: function () {
            $(this).remove();
        }
    };

    $.fn.popin = function (methodOrOptions) {
        
        if (methods[methodOrOptions]) {
            return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
            // Default to "init"
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + methodOrOptions + ' does not exist on jQuery.popin');
        }       
    }

    
}(jQuery));
