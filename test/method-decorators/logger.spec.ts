import { LoggerMethod } from './../../src/';

describe('LoggerMethod decorator', () => {

    beforeEach(() => {
        spyOn(console, 'log');
    });

    it('should not output log trace (no annotation, empty, default behaviour)', () => {
        class TestClassMethod {
            @LoggerMethod()
            add(a, b) {
                return a + b; 
            }
        }

        let testClass = new TestClassMethod();
        testClass.add(2, 3);
        expect(console.log).toHaveBeenCalledTimes(1);
    });

    it('should not output log trace (null annotation, default behaviour)', () => {
        class TestClassMethod {
            @LoggerMethod(null)
            add(a, b) {
                return a + b; 
            }
        }

        let testClass = new TestClassMethod();
        testClass.add(2, 3);
        expect(console.log).toHaveBeenCalledTimes(1);
    });

    it('should output default log trace for method start', () => {
        class TestClassMethod {
            @LoggerMethod({ entryTrace: true })
            add(a, b) {
                return a + b; 
            }
        }

        let testClass = new TestClassMethod();
        testClass.add(2, 3);
        expect(console.log).toHaveBeenCalledTimes(2);
    });

    it('should output default log trace in the method end', () => {
        class TestClassMethod {
            @LoggerMethod({ endTrace: true })
            add(a, b) {
                return a + b; 
            }
        }

        let testClass = new TestClassMethod();
        testClass.add(2, 3);
        expect(console.log).toHaveBeenCalledTimes(3);
    });

    it('should output default log trace in the beginning and end method invocation', () => {
        class TestClassMethod {
            @LoggerMethod({ entryTrace: true, endTrace: true })
            add(a, b) {
                return a + b; 
            }
        }

        let testClass = new TestClassMethod();
        testClass.add(2, 3);
        expect(console.log).toHaveBeenCalledTimes(4);
    });

    it('should output log trace with custom prefix', () => {
        let customPrefix = '[TEST-PREFIX]';
        class TestClassMethod {
            @LoggerMethod({ prefix: customPrefix })
            add(a, b) {
                return a + b; 
            }
        }

        let testClass = new TestClassMethod();
        testClass.add(2, 3);
        expect(console.log).toHaveBeenCalledTimes(1);
        expect(console.log).toHaveBeenCalledWith(jasmine.any(String));
    });

});