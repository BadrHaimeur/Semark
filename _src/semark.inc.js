(function ($, parser) {
    // Includes components :
    @@include('./cache/index.inc.js')
    @@include('./toolbar/index.inc.js')
    @@include('./content/index.inc.js')
    @@include('./statusbar/index.inc.js')

    // Starts main code :
    $.fn.semark = function() {
        // Initializes variables :
        var $self = this;


        // Returns 'this' for chaining :
        return $self;
    };

})(jQuery, window.markdownit());
