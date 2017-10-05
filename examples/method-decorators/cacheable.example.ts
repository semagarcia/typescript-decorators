import { Cacheable } from './../../src';

export class CacheableExampleClass {

    @Cacheable()
    add(a: number, b: number) {
        console.log(`Performing sum with => ${a} + ${b}`);
        return a + b;
    }

}

let exampleClass = new CacheableExampleClass();
exampleClass.add(3, 5);
exampleClass.add(1, 7);
exampleClass.add(4, 8);
exampleClass.add(3, 5);
