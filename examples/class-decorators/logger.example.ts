import { LoggerClass } from './../../src/class-decorators';

@LoggerClass()
export class LoggedExampleClass1 {
    foo() {
        console.log('I am inside of a foo1() method');
    }
}

@LoggerClass({
    prefix: '[CLASS2-LOGGER]'
})
export class LoggedExampleClass2 {
    foo() {
        console.log('I am inside of a foo2() method');
    }
}

@LoggerClass({
    messageOnLog: 'Instance created -',
    prefix: '[CLASS3-LOGGER]',
    timestamp: true
})
export class LoggedExampleClass3 {
    foo() {
        console.log('I am inside of a foo3() method');
    }
}

let exampleClass1 = new LoggedExampleClass1();
let exampleClass2 = new LoggedExampleClass2();
let exampleClass3 = new LoggedExampleClass3();