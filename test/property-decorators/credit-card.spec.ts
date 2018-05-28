import { CreditCard } from './../../src/';

describe('CreditCard decorator', () => {

    it('should xxx', () => {
        class CreditCardTestClass {
            @CreditCard() creditCard: string;
        }
        let testClass = new CreditCardTestClass();
        expect(true).toEqual(true);
    });

});