import { LoggerClass } from './../../src/';

describe('LoggerClass decorator', () => {

    beforeEach(() => {
        spyOn(console, 'log');
    });

    it('should output default trace log (no annotation, empty)', () => {
        @LoggerClass()
        class TestClassWithEmptyAnnotation {}

        let testClass = new TestClassWithEmptyAnnotation();
        let className = TestClassWithEmptyAnnotation.prototype.constructor.name;
        expect(console.log).toHaveBeenCalled();
        expect(console.log).toHaveBeenCalledWith(`New instance created of class ${className}`);
    });

    it('should output default trace log (no annotation, null)', () => {
        @LoggerClass(null)
        class TestClassWithNullAnnotation {}

        let testClass = new TestClassWithNullAnnotation();
        let className = TestClassWithNullAnnotation.prototype.constructor.name;
        expect(console.log).toHaveBeenCalled();
        expect(console.log).toHaveBeenCalledWith(`New instance created of class ${className}`);
    });

    it('should log class with prefix', () => {
        let prefixAnnotation = '[TEST-PREFIX]';

        @LoggerClass({
            prefix: prefixAnnotation
        })
        class TestClassWithPrefixAnnotation {}

        let testClass = new TestClassWithPrefixAnnotation();
        let className = TestClassWithPrefixAnnotation.prototype.constructor.name;
        expect(console.log).toHaveBeenCalled();
        expect(console.log).toHaveBeenCalledWith(`${prefixAnnotation} New instance created of class ${className}`);
    });

    it('should log class with timestamp', () => {
        @LoggerClass({
            timestamp: true
        })
        class TestClassWithTimestampAnnotation {}

        let testClass = new TestClassWithTimestampAnnotation();
        let className = TestClassWithTimestampAnnotation.prototype.constructor.name;
        expect(console.log).toHaveBeenCalled();
        expect(console.log).toHaveBeenCalledWith(jasmine.any(String));
    });

    it('should log class with log message', () => {
        let message = 'Instance class created of';
        @LoggerClass({
            messageOnLog: message
        })
        class TestClassWithLogMessageAnnotation {}

        let testClass = new TestClassWithLogMessageAnnotation();
        let className = TestClassWithLogMessageAnnotation.prototype.constructor.name;
        expect(console.log).toHaveBeenCalled();
        expect(console.log).toHaveBeenCalledWith(`${message} ${className}`);
    });

    it('should log class with all annotation values', () => {
        let prefix = '[TEST-PREFIX]';
        let message = 'Instance class created of';

        @LoggerClass({
            prefix: prefix,
            messageOnLog: message
        })
        class TestClassWithAllAnnotations {}

        let testClass = new TestClassWithAllAnnotations();
        let className = TestClassWithAllAnnotations.prototype.constructor.name;
        expect(console.log).toHaveBeenCalled();
        expect(console.log).toHaveBeenCalledWith(`${prefix} ${message} ${className}`);
    });

});