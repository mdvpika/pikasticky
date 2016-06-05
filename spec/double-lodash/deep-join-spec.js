describe('Deep Join', function(){
    it('should return the string when given a string', function(){
        let string = 'hello, world';
        let result = __.deepJoin(string);
        expect(result).toBe(string);
    });

    it('should join the strings in the array when given an array of strings', function(){
        let array= ['hello,', 'world'];
        let result = __.deepJoin(array);
        expect(result).toBe('hello, world');
    });
    
    it('should join the strings in the nested array when given an array of nested arrays of strings', function(){
        let array = [['hello,'], ['world']];
        let result = __.deepJoin(array);
        expect(result).toBe('hello, world');
    });
});
