import { ToLowercase } from './../../src/';

describe('ToLowercase decorator', () => {

    it('should throw an error when is applied over non string property', () => {
        class TestClassToLowercaseProperty {
            @ToLowercase() myProp: number;
        }
        let testClass = new TestClassToLowercaseProperty();
        expect(() => testClass.myProp = 7).toThrowError('The ToLowercase decorator has to be used over string object');
    });

    it('should apply default behavior', () => {
        class TestClassToLowercaseProperty {
            @ToLowercase() myProp: string;
        }

        let testClass = new TestClassToLowercaseProperty();
        let stringToAssign = 'A long String to Be tested';
        testClass.myProp = stringToAssign;
        expect(testClass.myProp).toEqual(stringToAssign.toLowerCase());
    });

    it('should use locale', () => {
        class TestClassToLowercaseProperty {
            @ToLowercase({ useLocale: true }) myProp: string;
        }

        let testClass = new TestClassToLowercaseProperty();
        let stringToAssign = 'A long String to Be tested';
        testClass.myProp = stringToAssign;
        expect(testClass.myProp).toEqual(stringToAssign.toLocaleLowerCase());
    });

});