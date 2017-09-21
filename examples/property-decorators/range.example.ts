

export class MinMaxClassExample {

    //@Range()
    positiveMinMax: number;

}

let minMaxExample = new MinMaxClassExample();
minMaxExample.positiveMinMax = 2;
console.log('\nResult of assign value 2 in range [0, 5] => ', minMaxExample.positiveMinMax);
minMaxExample.positiveMinMax = -2;
console.log('Result of assign value -2 in range [0, 5] => ', minMaxExample.positiveMinMax);
minMaxExample.positiveMinMax = 5;
console.log('Result of assign value 5 in range [0, 5] => ', minMaxExample.positiveMinMax);