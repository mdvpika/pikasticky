describe('Deep Equals', function(){
    it('should consider two equal numbers equal', function(){
        let number1= 314159265359;
        let number2 = 314159265359;
        let result = __.deepEquals(number1, number2);
        expect(result).toBe(true);
    });

    it('should consider two different numbers unequal', function(){
        let number1= 314159265359;
        let number2 = 953562951413;
        let result = __.deepEquals(number1, number2);
        expect(result).toBe(false);
    });

    it('should consider 2 equals strings equal', function(){
        let string1 = 'hello, world';
        let string2 = 'hello, world';
        let result = __.deepEquals(string1, string2);
        expect(result).toBe(true);
    });

    it('should consider 2 different strings unequal', function(){
        let string1 = 'hello, world';
        let string2 = 'dlrow ,olleh';
        let result = __.deepEquals(string1, string2);
        expect(result).toBe(false);
    })

    it('should consider 2 equal objects without nested objects equal', function(){
        let obj1 = {a : 'a'};
        let obj2 = {a: 'a'};
        let result = __.deepEquals(obj1, obj2);
        expect(result).toBe(true);
    });

    it('should consider 2 different objects without nested objects unequal', function(){
        let obj1 = {a : 'a'};
        let obj2 = {b: 'b'};
        let result = __.deepEquals(obj1, obj2);
        expect(result).toBe(false);
    });

    it('should consider 2 equal objects with nested objects equal', function(){
        let obj1 = {a:{b:'b'}};
        let obj2 = {a: {b:'b'}};
        let result = __.deepEquals(obj1, obj2);
        expect(result).toBe(true);
    });

    it('should consider 2 equal objects with nested objects equal', function(){
        let obj1 = {a:{b:'b'}};
        let obj2 = {a: {c:'c'}};
        let result = __.deepEquals(obj1, obj2);
        expect(result).toBe(false);
    });
})