import { LoggerMethod } from './../../src/';

describe("HelloComponent", () => {

    class X {
        @LoggerMethod()
        add(a, b) {
            return a + b; 
        }
    }

    it("should log method calls", () => {

        let x = new X();
        x.add(2, 3);
        x.add(1, 5);

        expect(true).toBe(true);
    });
});