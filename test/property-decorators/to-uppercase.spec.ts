import { ToUppercase } from './../../src/';

describe('ToUppercase decorator', () => {

    it('should throw an error when is applied over non string property', () => {
        class TestClassToUppercaseProperty {
            @ToUppercase() myProp: number;
        }
        let testClass = new TestClassToUppercaseProperty();
        expect(() => testClass.myProp = 7).toThrowError('The ToUppercase decorator has to be used over string object');
    });

    it('should apply default behavior', () => {
        class TestClassToUppercaseProperty {
            @ToUppercase() myProp: string;
        }

        let testClass = new TestClassToUppercaseProperty();
        let stringToAssign = 'a long string to be tested';
        testClass.myProp = stringToAssign;
        expect(testClass.myProp).toEqual(stringToAssign.toUpperCase());
    });


    it('should capitalize', () => {
        class TestClassToUppercaseProperty {
            @ToUppercase({ capitalize: true }) myProp: string;
        }

        let testClass = new TestClassToUppercaseProperty();
        testClass.myProp = 'a long String to be tested';
        expect(testClass.myProp).toEqual('A long String to be tested');
    });

    it('should use locale', () => {
        class TestClassToUppercaseProperty {
            @ToUppercase({ useLocale: true }) myProp: string;
        }

        let testClass = new TestClassToUppercaseProperty();
        let stringToTest = 'a long String to be tested';
        testClass.myProp = stringToTest;
        expect(testClass.myProp).toEqual(stringToTest.toLocaleUpperCase());
    });

    it('should capitalize using locale', () => {
        class TestClassToUppercaseProperty {
            @ToUppercase({ capitalize: true, useLocale: true }) myProp: string;
        }

        let testClass = new TestClassToUppercaseProperty();
        let stringToTest = 'a long String to be tested';
        testClass.myProp = stringToTest;
        expect(testClass.myProp).toBe(stringToTest[0].toLocaleUpperCase() + stringToTest.slice(1));
    });

});