import { LoggerProperty } from './../../src/';

describe('LoggerMethod decorator', () => {

    beforeEach(() => {
        spyOn(console, 'log');
    });

    it('should output log trace for "set" method (without annotation, default behaviour)', () => {
        class TestClassProperty {
            @LoggerProperty()
            name: string;
        }

        let testClass = new TestClassProperty();
        testClass.name = 'My name';
        expect(console.log).toHaveBeenCalled();
        expect(console.log).toHaveBeenCalledTimes(1);
    });

    it('should output log trace for "get" method (without annotation, default behaviour)', () => {
        let testName = 'My name';
        class TestClassProperty {
            @LoggerProperty()
            name: string = testName;
        }

        let testClass = new TestClassProperty();
        expect(testClass.name).toEqual(testName);
        expect(console.log).toHaveBeenCalled();
        expect(console.log).toHaveBeenCalledTimes(2);  // One for setting the name, another for getting the value
    });

    it('should not output any traces for getting/setting a value', () => {
        let testName = 'My name';
        class TestClassProperty {
            @LoggerProperty({ getter: false, setter: false })
            name: string = testName;
        }

        let testClass = new TestClassProperty();
        expect(testClass.name).toEqual(testName);
        expect(console.log).not.toHaveBeenCalled();
        expect(console.log).toHaveBeenCalledTimes(0);
    });

    it('should output trace with a prefix for setting a value', () => {
        let prefixLog = '[TEST-TRACE]';
        let testName = 'My name';
        class TestClassProperty {
            @LoggerProperty({ prefix: prefixLog })
            name: string = testName;
        }

        let testClass = new TestClassProperty();
        expect(console.log).toHaveBeenCalled();
        expect(console.log).toHaveBeenCalledWith(`${prefixLog} Setting value for field "name":`, testName);
    });

});