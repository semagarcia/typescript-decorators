import { DeprecatedMethod } from './../../src';

export class DeprecatedMethodExampleClass {

    @DeprecatedMethod()
    deprecatedMethod1() {
        console.log('I am the method deprecatedMethod1()');
    }

    @DeprecatedMethod('Deprecated method!!')
    deprecatedMethod2() {
        console.log('I am the method deprecatedMethod2()');
    }
}

let exampleClass = new DeprecatedMethodExampleClass();
try {
    exampleClass.deprecatedMethod1();
} catch(error) {
    console.log('Method 1 fired an exception');
}

try {
    exampleClass.deprecatedMethod2();
} catch(error) {
    console.log('Method 2 fired an exception with custom message');
}