import { DeprecatedMethod } from './../../src/';

describe('DeprecatedMethod decorator', () => {

    it('should throw an exception', () => {
        class TestDeprecatedMethodDecorator {
            @DeprecatedMethod()
            method() {
                console.log('I am a deprecated method');
            }
        }

        let testClass = new TestDeprecatedMethodDecorator();
        expect(() => testClass.method()).toThrowError('This method has been deprecated!');
    });

    it('should throw an exception', () => {
        class TestDeprecatedMethodDecorator {
            @DeprecatedMethod('Deprecated method!!')
            method() {
                console.log('I am a deprecated method');
            }
        }

        let testClass = new TestDeprecatedMethodDecorator();
        expect(() => testClass.method()).toThrowError('Deprecated method!!');
    });

});