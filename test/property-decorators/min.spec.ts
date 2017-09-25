import { Min } from './../../src/';

describe('LoggerMethod decorator', () => {

    it('should assign a valid value (greater or equals than min value)', () => {
        class TestClassMinValue {
            @Min(5)
            myNumber: number;
        }

        let testClass = new TestClassMinValue();
        testClass.myNumber = 5;
        expect(testClass.myNumber).toEqual(5);
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
        testClass.myNumber = 10;
        testClass.myNumber = 3;
        expect(testClass.myNumber).toEqual(10);
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