function AlphaTest() {}

AlphaTest.prototype = {
    init: function () {
        $('body').append('<canvas class="alpha-canvas"/>');
    },

    destroy: function () {
        $('.alpha-canvas').remove();
    }
};

(function () {
    window.ALPHA = new AlphaTest();
})();