import { Range } from '../../src/property-decorators/range';

export class RangeExampleClass {

    @Range({ min: 0, max: 5 })
    positiveRange: number;

    @Range({ min: -10, max: -3, throwOutOfRange: true })
    negativeRange: number;

    @Range({ min: -5, max: 5, protect: true, throwOutOfRange: true })
    wideRange: number;

}

let rangeExample = new RangeExampleClass();
rangeExample.positiveRange = 2;
console.log('\nResult of assign value 2 in range [0, 5] => ', rangeExample.positiveRange);
rangeExample.positiveRange = -2;
console.log('Result of assign value -2 in range [0, 5] => ', rangeExample.positiveRange);
rangeExample.positiveRange = 5;
console.log('Result of assign value 5 in range [0, 5] => ', rangeExample.positiveRange);

rangeExample.negativeRange = -2;
console.log('\nResult of assign value 2 in range [-10, -3] => ', rangeExample.negativeRange);
rangeExample.negativeRange = -3;
console.log('Result of assign value -3 in range [-10, -3] => ', rangeExample.negativeRange);
rangeExample.negativeRange = -7;
console.log('Result of assign value -7 in range [-10, -3] => ', rangeExample.negativeRange);

rangeExample.wideRange = 0;
console.log('\nResult of assign value 0 in range [-5, 5] => ', rangeExample.wideRange);
try {
    rangeExample.wideRange = 7;
} catch(err) {
    console.log('Result of assign value -3 in range [-5, 5] => ', rangeExample.wideRange);
}

//rangeExample.x = 3;