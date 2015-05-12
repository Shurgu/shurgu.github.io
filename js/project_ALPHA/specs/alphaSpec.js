describe('alpha.js', function () {

    beforeEach(function () {
        //$('body').html('');
    });

    afterEach(function () {
        //$('body').html('');
    });

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

        // it('Should create canvas inside provided container', function () {
        //     var $el = $('#container');
        //     window.ALPHA.init($el);
        //     expect($el.html()).toContain('canvas');
        //     expect($el.find('#alpha-canvas').length).toBe(1);
        // });
    });
});