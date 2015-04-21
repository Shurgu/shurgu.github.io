describe('alpha.js', function () {

    beforeEach(function () {
        //$('body').html('');
    });

    afterEach(function () {
        //$('body').html('');
    });

    describe('Initialize alpha', function () {
        it('Should exist ALPHA namespace', function () {
            expect(window.ALPHA).toBeDefined();
        });

        it('Should create canvas for drawing', function () {
            window.ALPHA.init();
            var $el = $('body');
            expect($el.html()).toContain('canvas');
            expect($el.find('#alpha-canvas').length).toBe(1);
        });
    });
});