import { Min } from './../../src/';

describe('Min decorator', () => {

    it('should assign a valid value (greater or equals than min value)', () => {
        class TestClassMinValue {
            @Min(5)
            myNumber: number;
        }

        let testClass = new TestClassMinValue();
        let valueToAssign = 5;
        testClass.myNumber = valueToAssign;
        expect(testClass.myNumber).toEqual(valueToAssign);
    });

    it('should assign null to the property (default value, protect = false) without throw an exception', () => {
        class TestClassMinValue {
            @Min(5)
            myNumber: number;
        }

        let testClass = new TestClassMinValue();
        testClass.myNumber = 3;
        expect(testClass.myNumber).toBeNull();
    });

    it('should protect the previous value when assign an invalid value (less than min value)', () => {
        class TestClassMinValue {
            @Min(5, true)
            myNumber: number;
        }

        let testClass = new TestClassMinValue();
        let validValueToAssign = 10;
        testClass.myNumber = validValueToAssign;
        testClass.myNumber = 3;
        expect(testClass.myNumber).toEqual(validValueToAssign);
    });

    it('should throw an error when the value assigned is invalid', () => {
        let exceptionMsg = 'Invalid min value assigned!';
        class TestClassMinValue {
            @Min(5, false, exceptionMsg)
            myNumber: number;
        }

        let testClass = new TestClassMinValue();
        expect(() => testClass.myNumber = 3).toThrowError(exceptionMsg);
    });

});