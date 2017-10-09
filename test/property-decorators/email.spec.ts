import { Email } from './../../src/';

describe('Email decorator', () => {

    it('should prevent assign an invalid address when the decorator is applied with default annotations', () => {
        class EmailTestClass {
            @Email() emailAddress: string;
        }
        let testClass = new EmailTestClass();
        let validAddress = 'a.a@a.com';
        testClass.emailAddress = 'a.a@a.com';
        expect(testClass.emailAddress).toEqual('a.a@a.com');
        testClass.emailAddress = 'a.@a.com';
        expect(testClass.emailAddress).toEqual(validAddress);
    });

    it('should throw an error when an invalid address is assigned', () => {
        class EmailTestClass {
            @Email({ throwError: true }) emailAddress: string;
        }
        let testClass = new EmailTestClass();
        expect(() => testClass.emailAddress = 'a.@a.com').toThrowError();
    });

});