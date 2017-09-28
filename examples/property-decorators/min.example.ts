import { Min } from '../../src/property-decorators/min';

export class MinExampleClass {

    @Min(-5)
    negativeValue: number = -5;

    @Min(5)
    positiveValue: number = 5;

    @Min(0, true)
    protectedValue: number = 0;

    @Min(5.2, false, 'The min value assignable has to be 5.2')
    decimalValue: number = 5.2;

}

let minClass = new MinExampleClass();

// Negative values
minClass.negativeValue = -5;
console.log('\nResult of assign -5 to "negativeValue" property: ', minClass.negativeValue);
minClass.negativeValue = -10;
console.log('Result of assign -10 to "negativeValue" property: ', minClass.negativeValue);
minClass.negativeValue = -4;
console.log('Result of assign -4 to "negativeValue" property: ', minClass.negativeValue);

// Positive values
minClass.positiveValue = 5;
console.log('\nResult of assign 5 to "positiveValue" property: ', minClass.positiveValue);
minClass.positiveValue = 0;
console.log('Result of assign 0 to "positiveValue" property: ', minClass.positiveValue);
minClass.positiveValue = 10;
console.log('Result of assign 10 to "positiveValue" property: ', minClass.positiveValue);

// Protected values
minClass.protectedValue = 3;
console.log('\nResult of assign 3 to "protectedValue" property: ', minClass.protectedValue);
minClass.protectedValue = -3;
console.log('Result of assign -3 to "protectedValue" property: ', minClass.protectedValue);

// Throwing error
minClass.decimalValue = 5.1;
console.log('\nResult of assign 5.1 to "decimalValue" property: ', minClass.decimalValue);