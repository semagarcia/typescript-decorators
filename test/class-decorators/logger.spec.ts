import { LoggerClass } from './../../src/';

describe("HelloComponent", () => {

    @LoggerClass() class X {}

    it("should say 'Hello world!'", () => {

        let x = new X();

        expect(true).toBe(true);
    });
});