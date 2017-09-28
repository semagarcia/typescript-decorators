import { StringLength } from '../../src/property-decorators';

export class StringLengthExampleClass {

    @StringLength({ min: 2 })
    minLength: string = 'AB';

    @StringLength({ max: 5 })
    maxLength: string = 'ABCDE';

    @StringLength({ min: 2, max: 5, throwError: true })
    wideRange: string;

    @StringLength({ min: 2, max: 5, allowNulls: true })
    wideRange2: string;

}

let exampleClass = new StringLengthExampleClass();
exampleClass.minLength = 'ABC';
console.log('\nMinLength after assign "ABC": ', exampleClass.minLength);
exampleClass.minLength = 'ABCD';
console.log('MinLength after assign "ABCD": ', exampleClass.minLength);

exampleClass.maxLength = 'ABCD';
console.log('\nMaxLength after assign "ABCD": ', exampleClass.maxLength);
exampleClass.maxLength = 'ABC';
console.log('MaxLength after assign "ABC": ', exampleClass.maxLength);
exampleClass.maxLength = '';
console.log('MaxLength after assign an empty string: ', exampleClass.maxLength);

exampleClass.wideRange = 'ABC';
console.log('\nWideRange after assign "ABC": ', exampleClass.wideRange);
try {
    exampleClass.wideRange = 'ABCDEFGH';
} catch(error) {
    console.log('Error catched assigning "ABCDEFGH" => ', error);
}
console.log('WideRange after assign "ABCDEFGH": ', exampleClass.wideRange);

exampleClass.wideRange2 = 'ABC';
console.log('\nWideRange2 after assign "ABC": ', exampleClass.wideRange2);
try {
    exampleClass.wideRange2 = 'ABCDEFGH';
} catch(error) {
    console.log('Error catched assigning "ABCDEFGH"!');
}
console.log('WideRange2 after assign "ABCDEFGH": ', exampleClass.wideRange2);
