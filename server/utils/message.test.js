const expect = require('expect');

const { generateMessage } = require('./message');


describe('GENERATING MESSAGES', () => {
    it('should generate a message', () => {
        var res = generateMessage('kaushik', 'hey buddy');

        expect(res.from).toBe('kaushik');
        expect(res.text).toBe('hey buddy');
        expect(res.createdAt).toBeA('number');
    });
});