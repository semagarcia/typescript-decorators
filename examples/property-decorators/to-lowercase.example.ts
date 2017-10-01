import { ToLowercase } from '../../src/property-decorators';

export class ToLowercaseExampleClass {

    @ToLowercase()
    propertyWithDefaultOptions: string;

    @ToLowercase({ useLocale: true })
    propertyUsingLocale: string;

    @ToLowercase()
    propertyNotValid: Number;

}

let exampleClass = new ToLowercaseExampleClass();
exampleClass.propertyWithDefaultOptions = 'StR';
console.log('A) [DefaultOptions] "StR" will be transformed to: ', exampleClass.propertyWithDefaultOptions);
exampleClass.propertyWithDefaultOptions = 'a new Str';
console.log('A) [DefaultOptions] "a New StR" will be transformed to: ', exampleClass.propertyWithDefaultOptions);

exampleClass.propertyUsingLocale = 'StR';
console.log('B) [UsingLocale] "StR" will be transformed to: ', exampleClass.propertyUsingLocale);
exampleClass.propertyUsingLocale = 'a New StR';
console.log('B) [UsingLocale] "a New StR" will be transformed to: ', exampleClass.propertyUsingLocale);

try {
    exampleClass.propertyNotValid = 7;
} catch(error) {
    console.log('Error fired when the decorator is applied to a object distinct of an string')
}