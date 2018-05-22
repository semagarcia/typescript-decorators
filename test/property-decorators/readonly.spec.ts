import { ReadOnly } from './../../src/';

describe('ReadOnly decorator', () => {

    it('should throw an error when options are not provided', () => {
        expect(() => {
            class TestClassReadOnlyProperty {
                @ReadOnly(null) myProp: any;
            }
        }).toThrowError('Value has to be provided!');
    });

    it('should throw an error when no mandatory value has been provided', () => {
        expect(() => {
            class TestClassReadOnlyProperty {
                @ReadOnly({ value: null, throwError: true }) myProp: any;
            }
        }).toThrowError('Value has to be provided!');
    });

    it('should assign a value and protect it from further assignments', () => {
        let valueToAssign = 7;
        class TestClassReadOnlyProperty {
            @ReadOnly({ value: valueToAssign, throwError: false }) myProp: any;
        }
        let exampleClass = new TestClassReadOnlyProperty();
        exampleClass.myProp = valueToAssign + 1;
        expect(exampleClass.myProp).toBe(valueToAssign);
        exampleClass.myProp = valueToAssign * 2;
        expect(exampleClass.myProp).toBe(valueToAssign);
    });

    it('should throw an error when trying to assign a value', () => {
        let valueToAssign = 7;
        class TestClassReadOnlyProperty {
            @ReadOnly({ value: valueToAssign, throwError: true }) myProp: any;
        }
        let exampleClass = new TestClassReadOnlyProperty();
        expect(() => { exampleClass.myProp = valueToAssign * 2 }).toThrowError('The property "myProp" is flagged as readonly!');
    });

    it('should assign a value returned by a function and protect it from further assignments', () => {
        let valueToAssign = 2;
        class TestClassReadOnlyProperty {
            @ReadOnly({ value: () => valueToAssign - 1, throwError: false }) myProp: any;
        }
        let exampleClass = new TestClassReadOnlyProperty();
        exampleClass.myProp = valueToAssign + 1;
        expect(exampleClass.myProp).toBe(valueToAssign - 1);
        exampleClass.myProp = valueToAssign * 2;
        expect(exampleClass.myProp).toBe(valueToAssign - 1);
    });

});