import { ReadOnly } from '../../src/property-decorators';

export class ReadOnlyExampleClass {

    @ReadOnly({ value: 'foo', throwError: false })
    property: string;

    @ReadOnly({ value: () => { return { a:1, b:2 } }, throwError: false })
    propertyFunction: Object;

    @ReadOnly({ value: [1, 2, 3], throwError: true })
    propertyThrowException: Array<Number>;

}

let exampleClass = new ReadOnlyExampleClass();
exampleClass.property = 'bar';
console.log('> property value: ', exampleClass.property);

exampleClass.propertyFunction = 'I am a function';
console.log('> propertyFunction value: ', exampleClass.propertyFunction);

try {
    exampleClass.propertyThrowException = [1, 1];
    console.log('> propertyThrowException not fired!');
} catch(error) {
    console.log('> propertyThrowException successfully fired!');
}
console.log('> propertyThrowException value: ', exampleClass.propertyThrowException);