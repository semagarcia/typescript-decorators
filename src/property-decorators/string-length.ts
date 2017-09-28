/**
 * Interface for StringLength decorator annotations
 * 
 * @export
 * @interface StringLengthOptions
 */
export interface StringLengthOptions {
    /** */
    min?: number;

    /** */
    max?: number;

    /** */
    allowNulls?: boolean;

    /** */
    throwError?: boolean;
}

/**
 * Decorator to assert either the max or the min length for a string class property
 * 
 * @export
 * @param {StringLengthOptions} options 
 * @returns 
 */
export function StringLength(options: StringLengthOptions) {
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
    }
}