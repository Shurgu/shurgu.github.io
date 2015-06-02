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

        it('Should create desired width and height canvas after initialize', function () {
            $('body').append('<div class="container" />');
            var $el = $('.container');
            var $canvas = window.ALPHA.init($el, 350, 350);
            expect($canvas.width()).toBe(350);
            expect($canvas.height()).toBe(350);
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
            this.$canvas = window.ALPHA.init(null, null, null, 'green');
        });

        afterEach(function () {
            window.ALPHA.destroy();
        });

        it('Should draw by init color', function () {
            window.ALPHA.draw();
            var data = this.$canvas[0].getContext('2d').getImageData(0, 0, 1, 1).data;
            expect(data[0]).toBe(0);
            expect(data[1]).toBe(128);
            expect(data[2]).toBe(0);
        });

        it('Should draw of desired color', function () {
            window.ALPHA.draw('white');
            var data = this.$canvas[0].getContext('2d').getImageData(0, 0, 1, 1).data;
            expect(data[0]).toBe(255);
            expect(data[1]).toBe(255);
            expect(data[2]).toBe(255);
        });

    });
});