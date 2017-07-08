const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./message');


describe('GENERATING MESSAGES', () => {
    it('should generate a message', () => {
        var res = generateMessage('kaushik', 'hey buddy');

        expect(res.from).toBe('kaushik');
        expect(res.text).toBe('hey buddy');
        expect(res.createdAt).toBeA('number');
    });

    it('should generate the location with correct url', () => {
        var res = generateLocationMessage('myself',1,1);

        expect(res.from).toBe('myself');
        expect(res.url).toBe('https://www.google.com/maps?q=1,1');
        expect(res.createdAt).toBeA('number');
    });

});