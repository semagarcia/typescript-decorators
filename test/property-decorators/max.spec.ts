import { Max } from './../../src/';

describe('LoggerMethod decorator', () => {

    it('should assign a valid value (less than max value)', () => {
        class TestClassMaxValue {
            @Max(10)
            myNumber: number;
        }

        let testClass = new TestClassMaxValue();
        let valueToAssign = 10;
        testClass.myNumber = valueToAssign;
        expect(testClass.myNumber).toEqual(valueToAssign);
    });

    it('should assign null to the property (default value, protect = false) without throw an exception', () => {
        class TestClassMaxValue {
            @Max(10)
            myNumber: number;
        }

        let testClass = new TestClassMaxValue();
        testClass.myNumber = 20;
        expect(testClass.myNumber).toBeNull();
    });

    it('should protect the previous value when assign an invalid value (greater than max value)', () => {
        class TestClassMaxValue {
            @Max(10, true)
            myNumber: number;
        }

        let testClass = new TestClassMaxValue();
        let valueToAssign = 10;
        testClass.myNumber = valueToAssign;
        testClass.myNumber = 20;
        expect(testClass.myNumber).toEqual(valueToAssign);
    });

    it('should throw an error when the value assigned is invalid', () => {
        let exceptionMsg = 'Invalid min value assigned!';
        class TestClassMaxValue {
            @Max(10, false, exceptionMsg)
            myNumber: number;
        }

        let testClass = new TestClassMaxValue();
        expect(() => testClass.myNumber = 20).toThrowError(exceptionMsg);
    });

});