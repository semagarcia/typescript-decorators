import { printTimeStamp } from './../../src';

describe('Logger helpers', () => {

    it('should return empty string', () => {
        expect(printTimeStamp(null)).toEqual('');
    });

    it('should return date with two digits when the number is lower than 10', () => {
        expect(printTimeStamp(new Date(2017, 0, 1, 3, 3, 0))).toEqual('[01/01/2017 03:03:00] ');
    });

    it('should return a valid date (with two digits day, month, minutes, hours and ms)', () => {
        expect(printTimeStamp(new Date(2017, 11, 18, 23, 23, 59))).toEqual('[18/12/2017 23:23:59] ');
    });

});