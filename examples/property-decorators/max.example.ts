import { Max } from '../../src/property-decorators/max';

export class MaxClassExample {

    @Max(-5)
    negativeValue: number = -5;

    @Max(5)
    positiveValue: number = 5;

    @Max(0, true)
    protectedValue: number = 0;

    @Max(5.2, false, 'The max value assignable has to be 5.2')
    decimalValue: number = 5.1;

}

let maxClassExample = new MaxClassExample();

// Negative values
maxClassExample.negativeValue = -5;
console.log('\nResult of assign -5 to "negativeValue" property: ', maxClassExample.negativeValue);
maxClassExample.negativeValue = -10;
console.log('Result of assign -10 to "negativeValue" property: ', maxClassExample.negativeValue);
maxClassExample.negativeValue = -4;
console.log('Result of assign -4 to "negativeValue" property: ', maxClassExample.negativeValue);

// Positive values
maxClassExample.positiveValue = 5;
console.log('\nResult of assign 5 to "positiveValue" property: ', maxClassExample.positiveValue);
maxClassExample.positiveValue = 0;
console.log('Result of assign 0 to "positiveValue" property: ', maxClassExample.positiveValue);
maxClassExample.positiveValue = 10;
console.log('Result of assign 10 to "positiveValue" property: ', maxClassExample.positiveValue);

// Protected values
maxClassExample.protectedValue = -3;
console.log('\nResult of assign -3 to "protectedValue" property: ', maxClassExample.protectedValue);
maxClassExample.protectedValue = 3;
console.log('Result of assign 3 to "protectedValue" property: ', maxClassExample.protectedValue);

// Throwing error
maxClassExample.decimalValue = 5.3;
console.log('\nResult of assign 5.3 to "decimalValue" property: ', maxClassExample.decimalValue);