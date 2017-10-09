import { Email } from '../../src/property-decorators';

export class EmailExampleClass {

    @Email()
    simpleEmail: string;

}

let exampleClass = new EmailExampleClass();
exampleClass.simpleEmail = 'a@a.com';
exampleClass.simpleEmail = 'a.@a.com';
