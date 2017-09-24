import { LoggerClass } from './../../src/';

describe('LoggerClass decorator', () => {

    @LoggerClass() class X {}

    it('should log class with no annotation', () => {

        let x = new X();

        expect(true).toBe(true);
    });

    it('should log class with null annotation', () => {

    });

    it('should log class with prefix', () => {

    });

    it('should log class with timestamp', () => {

    });

    it('should log class with message', () => {

    });

    it('should log class with all annotation values', () => {

    });

});