import { StringLength } from './../../src/';

describe('StringLength decorator', () => {

    describe('>> Annotation object', () => {
        it('should throw an error when no options are provided', () => {
            expect(() => {
                class StringLengthClass {
                    @StringLength(null)
                    str: string;
                };
            }).toThrowError('At least, this decorator needs either min or max length value!');
        });

        it('should throw an error when decorator is applied to non string property', () => {
            class StringLengthClass {
                @StringLength({ min: 2, max: 5 })
                property: number;
            };
            let testClass = new StringLengthClass();
            expect(() => testClass.property = 7).toThrowError('The value assigned is not an string!');
        });

        it('should throw an error when min and max limits are not provided', () => {
            expect(() => {
                class StringLengthClass {
                    @StringLength({ allowNulls: true })
                    str: string;
                };
            }).toThrowError('At least, this decorator needs either min or max length value!'); 
        });

        it('should throw an error when min value is equals or greater than the max length', () => {
            expect(() => {
                class StringLengthClass {
                    @StringLength({ min: 5, max: 2 })
                    str: string;
                };
            }).toThrowError('The max value has to be greater than the min one!'); 
        });
    });

    describe('>> Min length', () => {
        it('should accept values greater than the min value', () => {
            class StringLengthClass {
                @StringLength({ min: 3 })
                str: string;
            };
            let testClass = new StringLengthClass();
            testClass.str = 'ABC';
            expect(testClass.str).toEqual('ABC');
        });

        it('should respect the previous min valid assigned value', () => {
            class StringLengthClass {
                @StringLength({ min: 3 })
                str: string;
            };
            let testClass = new StringLengthClass();
            testClass.str = 'ABC';
            testClass.str = 'AB';
            expect(testClass.str).toEqual('ABC');
        });

        it('should the min value be undefined (not assigned)', () => {
            class StringLengthClass {
                @StringLength({ min: 3 })
                str: string;
            };
            let testClass = new StringLengthClass();
            testClass.str = 'AB';
            expect(testClass.str).toBeUndefined();
        });

        it('should assign a null value when the min value is invalid', () => {
            class StringLengthClass {
                @StringLength({ min: 3, allowNulls: true })
                str: string;
            };
            let testClass = new StringLengthClass();
            testClass.str = 'AB';
            expect(testClass.str).toBeNull();
        });

        it('should throw an error when the min value is invalid', () => {
            class StringLengthClass {
                @StringLength({ min: 3, throwError: true })
                str: string;
            };
            let testClass = new StringLengthClass();
            expect(() => testClass.str = 'AB').toThrowError('Invalid length; the value will not be assigned!');
        });
    });

    describe('>> Max length', () => {
        it('should accept values less than the max value', () => {
            class StringLengthClass {
                @StringLength({ max: 5 })
                str: string;
            };
            let testClass = new StringLengthClass();
            testClass.str = 'ABC';
            expect(testClass.str).toEqual('ABC');
        });

        it('should respect the previous max valid assigned value', () => {
            class StringLengthClass {
                @StringLength({ max: 5 })
                str: string;
            };
            let testClass = new StringLengthClass();
            testClass.str = 'ABC';
            testClass.str = 'ABCDEF';
            expect(testClass.str).toEqual('ABC');
        });

        it('should the max value be undefined (not assigned)', () => {
            class StringLengthClass {
                @StringLength({ max: 5 })
                str: string;
            };
            let testClass = new StringLengthClass();
            testClass.str = 'ABCDEF';
            expect(testClass.str).toBeUndefined();
        });

        it('should assign a null value when the max value is invalid', () => {
            class StringLengthClass {
                @StringLength({ max: 3, allowNulls: true })
                str: string;
            };
            let testClass = new StringLengthClass();
            testClass.str = 'ABCDEF';
            expect(testClass.str).toBeNull();
        });

        it('should throw an error when the min value is invalid', () => {
            class StringLengthClass {
                @StringLength({ max: 3, throwError: true })
                str: string;
            };
            let testClass = new StringLengthClass();
            expect(() => testClass.str = 'ABCDEF').toThrowError('Invalid length; the value will not be assigned!');
        });
    });

    describe('Min and Max length', () => {
        class StringLengthClass {
            @StringLength({ min: 2, max: 5, allowNulls: true, throwError: true })
            str: string;
        };

        it('should assign a value when its length is valid', () => {
            let testClass = new StringLengthClass();
            testClass.str = 'ABC';
            expect(testClass.str).toBe('ABC');
        });

        it('should throw an error when the length is lower than the min length', () => {
            let testClass = new StringLengthClass();
            expect(() => testClass.str = 'A').toThrowError();
            expect(testClass.str).toBeNull();
        });

        it('should throw an error when the length is greater than the max length', () => {
            let testClass = new StringLengthClass();
            expect(() => testClass.str = 'ABCDEF').toThrowError();
            expect(testClass.str).toBeNull();
        });
        
    });

});