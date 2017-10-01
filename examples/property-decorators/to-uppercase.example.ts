import { ToUppercase } from '../../src/property-decorators';

export class ToUppercaseExampleClass {

    @ToUppercase()
    propertyWithDefaultOptions: string;

    @ToUppercase({ useLocale: true })
    propertyUsingLocale: string;

    @ToUppercase({ capitalize: true })
    propertyCapitalized: string;

    @ToUppercase()
    propertyNotValid: Number;

}

let exampleClass = new ToUppercaseExampleClass();
exampleClass.propertyWithDefaultOptions = 'str';
console.log('A) [DefaultOptions] "str" will be transformed to: ', exampleClass.propertyWithDefaultOptions);
exampleClass.propertyWithDefaultOptions = 'a new Str';
console.log('A) [DefaultOptions] "a new Str" will be transformed to: ', exampleClass.propertyWithDefaultOptions);

exampleClass.propertyUsingLocale = 'str';
console.log('B) [UsingLocale] "str" will be transformed to: ', exampleClass.propertyUsingLocale);
exampleClass.propertyUsingLocale = 'a new Str';
console.log('B) [UsingLocale] "a new Str" will be transformed to: ', exampleClass.propertyUsingLocale);

exampleClass.propertyCapitalized = 'str';
console.log('C) [Capitalized] "str" will be transformed to: ', exampleClass.propertyCapitalized);
exampleClass.propertyCapitalized = 'a new Str';
console.log('C) [Capitalized] "a new Str" will be transformed to: ', exampleClass.propertyCapitalized);

try {
    exampleClass.propertyNotValid = 7;
} catch(error) {
    console.log('Error fired when the decorator is applied to a object distinct of an string')
}