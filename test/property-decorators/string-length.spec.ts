import { StringLength } from './../../src/';

describe('StringLength decorator', () => {

    it('should throw an error when no options are provided', () => {
        class StringLengthClass {
            @StringLength()
            str: string;
        };
    });

    it('', () => {});

});