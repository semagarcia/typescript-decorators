/**
 * Interface for StringLength decorator
 */
export interface StringLengthOptions {
    /** The minimun string length (optional) */
    min?: number;

    /** The maximum string length (optional) */
    max?: number;

    /** If this flag is truly, the property could take null values */
    allowNulls?: boolean;

    /** Flag to throw an error if the length constraints are not satisfied */
    throwError?: boolean;
}

/**
 * Decorator to assert either the max or the min length for a string class property
 * 
 * @param {StringLengthOptions} [options] Configuration object for the decorator
 * @returns {PropertyDecorator}
 */
export function StringLength(options: StringLengthOptions): PropertyDecorator {
    checkOptionAnnotations(options);

    return function(target: Object, propertyKey: string | symbol) {
        let value = target[propertyKey];
        Reflect.deleteProperty[propertyKey];
        Reflect.defineProperty(target, propertyKey, {
            // Getter
            get: () => value,

            // Setter
            set: (val: string) => {
                // Check the type, if it is defined/provided
                if(typeof(val) !== 'string') {
                    throw new Error('The value assigned is not an string!');
                }

                if('max' in options && 'min' in options && val.length >= options.min && val.length <= options.max) {
                    value = val;
                } else if('max' in options && !('min' in options) && val.length <= options.max) {
                    value = val;
                } else if('min' in options && !('max' in options) && val.length >= options.min) {
                    value = val;
                } else {
                    if(options.allowNulls) 
                        value = null;
                    
                    if(options.throwError) 
                        throw new Error('Invalid length; the value will not be assigned!');
                }
            }
        });
    }
}

function checkOptionAnnotations(opts) {
    if(!opts || (!('max' in opts) && !('min' in opts))) {
        throw new Error('At least, this decorator needs either min or max length value!');
    } else if('max' in opts && 'min' in opts && opts.min >= opts.max) {
        throw new Error('The max value has to be greater than the min one!');
    }
}