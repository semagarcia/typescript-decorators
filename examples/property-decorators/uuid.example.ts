import { UUID } from '../../src/property-decorators';

export class UUIDExampleClass {

    @UUID()
    uuidV4: string;

    @UUID({ uuidVersion: 1, protect: false })
    uuidV1: string;

    @UUID({ throwError: true })
    invalidUuid: string;

}

let exampleClass = new UUIDExampleClass();
exampleClass.uuidV4 = 'b2ec6061-82c6-42cc-9394-d24c2473d14d';
console.log('\nAssigning a valid V4: ', exampleClass.uuidV4);
exampleClass.uuidV1 = '1b8bae4c-5fb5-11e8-9c2d-fa7ae01bbebc';
console.log('Assigning a valid V1: ', exampleClass.uuidV1);
try {
    exampleClass.invalidUuid = 'INVALID-UUID';
    console.log('Assiging an invalid UUID (with throwError = true): ', exampleClass.invalidUuid);
} catch(error) {
    console.log('Exception catched while an invalid UUID was assigned!!');
}