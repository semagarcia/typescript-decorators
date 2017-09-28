import { Max } from '../../src/property-decorators/max';

export class MaxExampleClass {

    @Max(-5)
    negativeValue: number = -5;

    @Max(5)
    positiveValue: number = 5;

    @Max(0, true)
    protectedValue: number = 0;

    @Max(5.2, false, 'The max value assignable has to be 5.2')
    decimalValue: number = 5.1;

}

let maxClass = new MaxExampleClass();

// Negative values
maxClass.negativeValue = -5;
console.log('\nResult of assign -5 to "negativeValue" property: ', maxClass.negativeValue);
maxClass.negativeValue = -10;
console.log('Result of assign -10 to "negativeValue" property: ', maxClass.negativeValue);
maxClass.negativeValue = -4;
console.log('Result of assign -4 to "negativeValue" property: ', maxClass.negativeValue);

// Positive values
maxClass.positiveValue = 5;
console.log('\nResult of assign 5 to "positiveValue" property: ', maxClass.positiveValue);
maxClass.positiveValue = 0;
console.log('Result of assign 0 to "positiveValue" property: ', maxClass.positiveValue);
maxClass.positiveValue = 10;
console.log('Result of assign 10 to "positiveValue" property: ', maxClass.positiveValue);

// Protected values
maxClass.protectedValue = -3;
console.log('\nResult of assign -3 to "protectedValue" property: ', maxClass.protectedValue);
maxClass.protectedValue = 3;
console.log('Result of assign 3 to "protectedValue" property: ', maxClass.protectedValue);

// Throwing error
maxClass.decimalValue = 5.3;
console.log('\nResult of assign 5.3 to "decimalValue" property: ', maxClass.decimalValue);