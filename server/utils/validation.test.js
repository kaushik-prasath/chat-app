var expect = require('expect');
var {isRealString} = require('./validation');

describe('Valid String checker', ()=>{
    it('Should reject non-string values',()=>{
        var res = isRealString(1234);

        expect(res).toBe(false);
    });

    it('Should reject string with only spaces',()=>{
        var res = isRealString('       ');

        expect(res).toBe(false);
    });

    it('Should allow string with non-space characters',()=>{
        var res = isRealString('kaushik');

        expect(res).toBe(true);
        
    });
});