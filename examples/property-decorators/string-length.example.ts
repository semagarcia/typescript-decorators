import { StringLength } from '../../src/property-decorators';

export class StringLengthClassExample {

    @StringLength({ min: 2 })
    minLength: string = 'AB';

    /*@StringLength({ max: 5 })
    maxLength: string;

    @StringLength({ min: 2, max: 5, throwError: true })
    wideRange: string;*/

}

let exampleClass = new StringLengthClassExample();
exampleClass.minLength = 'ABC';
console.log('\nMinLength: ', exampleClass.minLength);
exampleClass.minLength = 'ABCD';
console.log('MinLength: ', exampleClass.minLength);
//exampleClass.minLength.concat('D');
console.log('MinLength: ', exampleClass.minLength);
