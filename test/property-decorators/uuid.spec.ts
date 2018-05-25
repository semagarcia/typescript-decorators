import { UUID } from './../../src/';

describe('UUID decorator', () => {

    it('should check a valid UUID V4 with no options', () => {
        class UuidTestClass {
            @UUID() uuid: string;
        }
        let testClass = new UuidTestClass();
        let validUuid = 'bdcb5308-94c4-41de-ab0e-ac79e725f129';
        testClass.uuid = validUuid;
        expect(testClass.uuid).toEqual(validUuid);
    });

    it('should throw an error due to a non UUID value without protection', () => {
        class UuidTestClass {
            @UUID({ protect: false, throwError: true }) uuid: string;
        }
        let testClass = new UuidTestClass();
        expect(() => testClass.uuid = 'INVALID-UUID').toThrowError('Invalid UUID format');
        expect(testClass.uuid).toBeFalsy();
    });

    it('should prevent an invalid UUID when previously it has been a valid UUID V4', () => {
        class UuidTestClass {
            @UUID({ uuidVersion: 4, protect: true }) uuid: string;
        }
        let testClass = new UuidTestClass();
        let validUuidV4 = '6535d9af-202e-4e9e-b7e9-ddd858088b18';
        testClass.uuid = validUuidV4;
        expect(testClass.uuid).toEqual(validUuidV4);
        testClass.uuid = '19f5fc7c-5fb0-11e8-9c2d-fa7ae01bbebc';  // Valid UUIDv1
        expect(testClass.uuid).toEqual(validUuidV4);
        testClass.uuid = 'INVALID-UUID';  // Invalid UUID
        expect(testClass.uuid).toEqual(validUuidV4);
    });

    it('should prevent a valid UUID V1 when V4 is specified', () => {
        class UuidTestClass {
            @UUID({ protect: false }) uuid: string;
        }
        let testClass = new UuidTestClass();
        testClass.uuid = 'ec96fc9c-5fb2-11e8-9eed-fa7ae01bbebc';
        expect(testClass.uuid).toBeFalsy();
    });

    it('should check a valid UUID V4 specifying V1 without protection', () => {
        class UuidTestClass {
            @UUID({ uuidVersion: 4 }) uuid: string;
        }
        let testClass = new UuidTestClass();
        let validUuidV1 = 'e6e129fc-5fae-11e8-9c2d-fa7ae01bbebc';
        testClass.uuid = validUuidV1;
        expect(testClass.uuid).toBeFalsy();
    });

    it('should check a valid UUID V4 specifying V1 without protection and error throwing', () => {
        class UuidTestClass {
            @UUID({ uuidVersion: 1, protect: false, throwError: true }) uuid: string;
        }
        let testClass = new UuidTestClass();
        let validUuidV4 = 'a63f64ec-c731-4060-9afa-4aa6c71f5c27';
        expect(() => testClass.uuid = validUuidV4).toThrowError('Invalid UUID format');
        expect(testClass.uuid).toBeFalsy();
    });

    it('should check a valid UUID V1 specifying V4 by default with protection and error throwing', () => {
        class UuidTestClass {
            @UUID({ protect: true, throwError: true }) uuid: string;
        }
        let testClass = new UuidTestClass();
        let validUuidV1 = '1112d99e-5fb1-11e8-9c2d-fa7ae01bbebc';
        expect(() => testClass.uuid = validUuidV1).toThrowError('Invalid UUID format');
        expect(testClass.uuid).toBeFalsy();
    });

});