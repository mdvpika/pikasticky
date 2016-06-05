// lodash like functions
let __ = (function () {
    'use strict';
    function DoubleLodash() {
    }

    let deepEquals = function (obj1, obj2) {
        let isObj1 = isObject(obj1);
        let isObj2 = isObject(obj2);

        let isObj1XNOR2 = xnor(isObj1, isObj2);

        if (isObj1XNOR2) {
            if (isObj1 && isObj2) {
                if (attrNamesEquals(obj1, obj2)) {
                    for (let attr in obj1) {
                        let attrObj1 = obj1[attr];
                        let attrObj2 = obj2[attr];
                        let attrEquals = deepEquals(attrObj1, attrObj2);
                        if (!attrEquals) {
                            return false;
                        }
                    }
                    return true;
                }
                else {
                    return false;
                }
            } else {
                return obj1 === obj2;
            }
        }
        else {
            return false;
        }
    };

    let attrNamesEquals = function (obj1, obj2) {
        let attrNamesEquals = hasAttrNames(obj1, obj2);
        if (!attrNamesEquals) {
            return false;
        }
        return hasAttrNames(obj2, obj1);

    };

    let hasAttrNames = function (obj1, obj2) {
        let hasAttrNames = true;
        for (let attrName1 in obj1) {
            if (!(attrName1 in obj2)) {
                hasAttrNames = false;
                break;
            }
        }
        return hasAttrNames;
    };

    let isObjectChecks = [
        obj => {
            let typeOfObj = typeof obj;
            return !['number', 'string', 'boolean', 'undefined'].includes(typeOfObj)
        },
        obj => {
            return obj !== null;
        }
    ];

    let isObject = function (obj) {
        return runChecks(obj, isObjectChecks);
    };

    let asArray = function (element) {
        if (!Array.isArray(element)) {
                return [element];
        }
        else {
            return element;
        }
    };

    let doOnFirst = function (array, arg1, arg2, action) {
        let propToSearch = arg2 !== undefined
        let value = propToSearch ? arg2 : arg1;
        let propArray = propToSearch ? arg1 : [];

        let propValArray = propMap(array, propArray);
        for (let arrayIx = 0; arrayIx < array.length; ++arrayIx) {
            let propVal = propValArray[arrayIx];
            if (propVal === value) {
                let arrayVal = array[arrayIx];
                return action(arrayIx, arrayVal);
            }
        }
        return undefined;
    };

    let findIndex = function (array, arg1, arg2) {
        return doOnFirst(array, arg1, arg2, ix => ix);
    };

    let find = function (array, arg1, arg2) {
        return doOnFirst(array, arg1, arg2, (ix, x) => x);
    };

    let remove = function (array, arg1, arg2) {
        return doOnFirst(array, arg1, arg2, (ix, x) => {
            array.splice(ix, 1);
            return x;
        });
    };

    let propMap = function (array, propArray) {
        array = asArray(array);
        let map = [];
        for (let arrayIx = 0; arrayIx < array.length; ++arrayIx) {
            let object = array[arrayIx];
            let prop = readProp(object, propArray);
            map.push(prop);
        }
        return map;
    };

    let readProp = function (object, propArray) {
        propArray = asArray(propArray);
        let prop = object;
        for (let propIx = 0; propIx < propArray.length; propIx++) {
            let propName = propArray[propIx];
            prop = prop[propName];
        }
        return prop;
    };

    let multiCall = function (fnArray, ...args) {
        fnArray = asArray(fnArray);
        return execMapInner(fnArray, ...args);
    };

    let execMapInner = function (fnArray, ...args) {
        let map = [];
        for (let i = 0; i < fnArray.length; ++i) {
            map.push(fnArray[i]());
        }
        return map;
    };

    let runChecks = function (obj, checks) {
        for (let i = 0; i < checks.length; ++i) {
            let passedCheck = !!checks[i](obj)
            if (passedCheck === false) {
                return false;
            }
        }
        return true;
    };

    let xor = function (bool1, bool2) {
        return !(bool1 && bool2) && (bool1 || bool2);
    };

    let xnor = function (bool1, bool2) {
        return (bool1 && bool2 || !(bool1 || bool2))
    };

    let minus = function (obj1, obj2) {
        let minus = {};
        for (let attr in obj1) {
            minus[attr] = obj1[attr] - obj2[attr];
        }
        return minus;
    };

    let contains = function (str1, str2) {
        return str1.indexOf(str2) !== -1;
    };

    let deepJoin = function (arrayOrString) {
        if (typeof arrayOrString === 'string') {
            return arrayOrString;
        }
        else if (Array.isArray(arrayOrString)) {
            let accumulator = '';
            for (let i = 0; i < arrayOrString.length; ++i) {
                if (i != 0) {
                    accumulator += ' ';
                }
                accumulator += deepJoin(arrayOrString[i]);
            }
            return accumulator;
        }
    };

    function combine(elementMerge, ...args) {
        if (Array.isArray(args[0])) {
            let mergedFnArray = [];
            for (let arrayIx = 0; arrayIx < args[0].length; ++arrayIx) {

                let mergeArgs = [];
                for (let j = 0; j < args.length; ++j) {
                    mergeArgs.push(args[j][arrayIx]);
                }
                let mergedFn = elementMerge(...mergeArgs);
                mergedFnArray.push(mergedFn);
            }
            return mergedFnArray;
        }
        else {
            return elementMerge(...args);
        }
    }

    DoubleLodash.deepEquals = deepEquals;
    DoubleLodash.attrNamesEquals = attrNamesEquals;
    DoubleLodash.hasAttrNames = hasAttrNames;
    DoubleLodash.isObject = isObject;
    DoubleLodash.runChecks = runChecks;
    DoubleLodash.asArray = asArray;
    DoubleLodash.findIndex = findIndex;
    DoubleLodash.find = find;
    DoubleLodash.remove = remove;
    DoubleLodash.multiCall = multiCall;
    DoubleLodash.xor = xor;
    DoubleLodash.xnor = xnor;
    DoubleLodash.minus = minus;
    DoubleLodash.contains = contains;
    DoubleLodash.deepJoin = deepJoin;
    DoubleLodash.combine = combine;

    return DoubleLodash
})();