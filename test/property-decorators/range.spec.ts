import { Range } from './../../src/';

describe('Range decorator', () => {

    it('should throw an error when no annotations are provided', () => {
        expect(() => {
            class TestClassRangeValue {
                @Range(null)  // This will throw a TypeScript error (obviously)
                myNumber: number;
            }
        }).toThrowError('No range options provided');
    });

    it('should throw an error when the min and ax range values are invalid', () => {
        expect(() => {
            class TestClassRangeValue {
                @Range({ max: 0, min: 10 })
                myNumber: number;
            }
        }).toThrowError('The min range value has to be less than max value');
    });

    it('should throw an error when the min value are invalid (not a number)', () => {
        expect(() => {
            class TestClassRangeValue {
                @Range({ max: 10, min: +'A' })
                myNumber: number;
            }
        }).toThrowError('The min range value is mandatory');
    });

    it('should throw an error when the max value are invalid (not a number)', () => {
        expect(() => {
            class TestClassRangeValue {
                @Range({ min: 0, max: +'A' })
                myNumber: number;
            }
        }).toThrowError('The max range value is mandatory');
    });

    it('should assign a valid value (inside the range)', () => {
        class TestClassRangeValue {
            @Range({ min: 0, max: 10 })
            myNumber: number;
        }

        let testClass = new TestClassRangeValue();
        let valueToAssign = 5;
        testClass.myNumber = valueToAssign;
        expect(testClass.myNumber).toEqual(valueToAssign);
    });

    it('should protect the value when invalid value is assigned', () => {
        class TestClassRangeValue {
            @Range({ min: 0, max: 10, protect: true })
            myNumber: number;
        }

        let testClass = new TestClassRangeValue();
        let valueToAssign = 5;
        testClass.myNumber = valueToAssign;
        testClass.myNumber = 15;
        expect(testClass.myNumber).toEqual(valueToAssign);
    });

    it('should throw an error when invalid value is assigned', () => {
        class TestClassRangeValue {
            @Range({ min: 0, max: 10, protect: false, throwOutOfRange: true })
            myNumber: number;
        }

        let testClass = new TestClassRangeValue();
        let valueToAssign = 5;
        testClass.myNumber = valueToAssign;
        expect(() => testClass.myNumber = 15).toThrowError('Value out of range!');
    });

});