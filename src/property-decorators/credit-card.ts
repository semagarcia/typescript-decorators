/**
 * Options for CreditCard decorator
 */
export interface CreditCardOptions {
    /** Version of UUID to check. By default, the version to check is V4 */
    uuidVersion: number;

    /** Flag to check the value to assign and prevent if it is invalid; if the flag is set
     * to false, when an invalid value will be passed, the null value will be assigned
     */
    protect?: boolean;

    /** Flag to throw an error if the assigned value is invalid */
    throwError?: boolean;
}

/**
 * Decorator to assert and validate the property is a valid UUID in the format 
 * AAAAAAAA-BBBB-MCCC-NDDD-EEEEEEEEEEEE (8-4-4-4-12, with medium dash included)
 * 
 * @param {CreditCardOptions} [creditCardOpts] Configuration object for UUID decorator
 * @returns {PropertyDecorator}
 */
export function CreditCard(creditCardOpts?: CreditCardOptions): PropertyDecorator {
    //const uuidVersion = (uuidOptions && uuidOptions.uuidVersion) ? uuidOptions.uuidVersion : 4;
    //const protect = (uuidOptions && uuidOptions.protect) ? uuidOptions.protect : true;
    //const error = (uuidOptions && uuidOptions.throwError) ? uuidOptions.throwError : false;

    return function(target: Object, propertyKey: string | symbol) {
        let value = target[propertyKey];
        Reflect.deleteProperty[propertyKey];
        Reflect.defineProperty(target, propertyKey, {
            // Getter
            get: () => value,

            // Setter
            set: (val: string) => {
                /*if(val && typeof(val) === 'string' && val.length === 36) {
                    const segments = val.split('-');
                    if(segments && segments.length === 4 && +segments[2][0] === uuidVersion) {
                        value = val;
                    } else {
                        if(!protect) value = null;
                        if(error) throw new Error('Invalid UUID format');
                    }
                } else {
                    if(!protect) value = null;
                    if(error) throw new Error('Invalid UUID format');
                }*/
            }
        });
    }
}