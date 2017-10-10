import { Email } from '../../src/property-decorators';

export class EmailExampleClass {

    @Email()
    simpleEmail: string;

    @Email({ protect: false })
    nonProtectedEmail: string;

    @Email({ throwError: true })
    throwableEmail: string;

}

let exampleClass = new EmailExampleClass();
exampleClass.simpleEmail = 'a@a.com';
console.log('\nAssiging a valid address: ', exampleClass.simpleEmail);
exampleClass.simpleEmail = 'a.@a.com';
console.log('Assiging an invalid address (default annotations): ', exampleClass.simpleEmail);

exampleClass.nonProtectedEmail = 'a@a.com';
console.log('\nAssiging a valid address: ', exampleClass.nonProtectedEmail);
exampleClass.nonProtectedEmail = 'a.@a.com';
console.log('Assiging an invalid address (with protect = false): ', exampleClass.nonProtectedEmail);

exampleClass.throwableEmail = 'a@a.com';
console.log('\nAssiging a valid address: ', exampleClass.throwableEmail);
try {
    exampleClass.throwableEmail = 'a.@a.com';
    console.log('Assiging an invalid address (with throwError = true): ', exampleClass.throwableEmail);
} catch(error) {
    console.log('Exception catched!!');
}