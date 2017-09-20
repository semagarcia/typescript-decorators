import { Min } from '../../src/property-decorators/min';

export class MinClassExample {

    @Min(-5)
    negativeValue: number = -5;

    @Min(5)
    positiveValue: number = 5;

    @Min(0, true)
    protectedValue: number = 0;

    @Min(5.2, false, 'The min value assignable has to be 5.2')
    decimalValue: number = 5.2;

}

let minClassExample = new MinClassExample();

// Negative values
minClassExample.negativeValue = -5;
console.log('\nResult of assign -5 to "negativeValue" property: ', minClassExample.negativeValue);
minClassExample.negativeValue = -10;
console.log('Result of assign -10 to "negativeValue" property: ', minClassExample.negativeValue);
minClassExample.negativeValue = -4;
console.log('Result of assign -4 to "negativeValue" property: ', minClassExample.negativeValue);

// Positive values
minClassExample.positiveValue = 5;
console.log('\nResult of assign 5 to "positiveValue" property: ', minClassExample.positiveValue);
minClassExample.positiveValue = 0;
console.log('Result of assign 0 to "positiveValue" property: ', minClassExample.positiveValue);
minClassExample.positiveValue = 10;
console.log('Result of assign 10 to "positiveValue" property: ', minClassExample.positiveValue);

// Protected values
minClassExample.protectedValue = 3;
console.log('\nResult of assign 3 to "protectedValue" property: ', minClassExample.protectedValue);
minClassExample.protectedValue = -3;
console.log('Result of assign -3 to "protectedValue" property: ', minClassExample.protectedValue);

// Throwing error
minClassExample.decimalValue = 5.1;
console.log('\nResult of assign 5.1 to "decimalValue" property: ', minClassExample.decimalValue);