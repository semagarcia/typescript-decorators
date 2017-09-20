import { LoggerMethod } from './../../src/method-decorators';

export class CacheExampleClass {
    private expires = 5;
    
    constructor() {}

    @LoggerMethod()
    voidMethodWithoutAnnotation(args) {
        console.log('I am the method voidMethodWithoutAnnotation()');
    }

    @LoggerMethod({
        prefix: '[METHOD-LOGGER]',
        entryTrace: true,
        endTrace: true
    })
    sumTwoNumbers(a: number, b: string) {
        return a + Number(b);
    }

    @LoggerMethod({
        prefix: '[METHOD-LOGGER]',
        entryTrace: true,
        endTrace: true,
        timestamp: true
    })
    slowMethod() {
        // The execution of this method could vary depending of your machine
        for(let i=0; i<999999999; i++) {}
    }
}

let exampleClass = new CacheExampleClass();
exampleClass.voidMethodWithoutAnnotation(1);
exampleClass.sumTwoNumbers(3, '4');
exampleClass.slowMethod();