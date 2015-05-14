describe('alpha.js', function () {

    beforeEach(function () {});

    afterEach(function () {});

    it('Should exist ALPHA namespace', function () {
        expect(window.ALPHA).toBeDefined();
    });

    describe('Initialize alpha', function () {
        beforeEach(function () {
            window.ALPHA.init();
        });

        afterEach(function () {
            window.ALPHA.destroy();
        });

        it('Should create canvas for drawing', function () {
            var $el = $('body');
            expect($el.find('.alpha-canvas').length).toBe(1);
        });

        it('Should destroy canvas on destroy()', function () {
            var $el = $('body');
            window.ALPHA.destroy();
            expect($el.find('.alpha-canvas').length).toBe(0);
        });
    });

    describe('Options for alpha', function () {
        afterEach(function () {
            window.ALPHA.destroy();
        });

        it('Should create canvas inside provided container', function () {
            $('body').append('<div class="container" />');
            var $el = $('.container');
            window.ALPHA.init($el);
            expect($el.find('.alpha-canvas').length).toBe(1);
            expect($.find('.alpha-canvas').length).toBe(1);
        });

        it('Should return handle to canvas after initialize', function () {
            $('body').append('<div class="container" />');
            var $el = $('.container');
            var $canvas = window.ALPHA.init($el);
            expect($canvas).toBeDefined();
            expect($canvas.prop('tagName').toLowerCase()).toBe('canvas');
        });
    });

    describe('Test drawing API', function () {
        beforeEach(function () {
            this.$canvas = window.ALPHA.init();
        });

        afterEach(function () {
            window.ALPHA.destroy();
        });

        it('Should draw UI', function () {
            window.ALPHA.drawUI();
            var data = this.$canvas[0].getContext('2d').getImageData(0, 0, 1, 1).data;
            expect(data[0]).toBe(128);
            expect(data[1]).toBe(128);
            expect(data[2]).toBe(128);
        });
    });
});