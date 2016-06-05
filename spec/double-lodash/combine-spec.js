describe('Merge', function(){

    function mergeFn(elem1, elem2){
        return Array.prototype.join.call(arguments, ' ');
    }

    it('should combine single values', function(){
        let string1 = 'hello,';
        let string2 = 'world';
        let result = __.combine(mergeFn, string1, string2);
        expect(result).toBe('hello, world');
    });

    it('should combine 2 arrays of values', function(){
        let array1 = ['hello,', 'dlrow'];
        let array2 = ['world', ',olleh'];
        let result = __.combine(mergeFn, array1, array2);
        expect(result).toEqual(['hello, world', 'dlrow ,olleh']);
    });

    it('should combine 4 arrays of values', function(){
        let array1 = ['abc', 'def'];
        let array2 = ['ghi', 'jkl'];
        let array3 = ['mno', 'pqr'];
        let array4 = ['stu', 'vwx'];
        let result = __.combine(mergeFn, array1, array2, array3, array4);
        expect(result).toEqual(['abc ghi mno stu', 'def jkl pqr vwx'])

    });
});
