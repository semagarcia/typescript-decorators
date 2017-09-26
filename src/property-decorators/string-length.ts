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
    if(!options || (!options.max && !options.min))
        throw new Error('At least, this decorator needs either min or max length value!');

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

                if(options.max && Number.isNaN(options.min) && val.length <= options.max) {
                    console.log(`Max length defined, right value (${value})`);
                    value = val;
                } else if(options.min && Number.isNaN(options.max) && val.length >= options.min) {
                    console.log(`Min length defined, right value (${value})`);
                    value = val;
                } else if(options.min && options.max && options.min <= val.length && val.length <= options.max) { 
                    console.log(`Min & max lengths defined, right value (${value})`);
                    value = val;
                } else {
                    console.log(`Error in value length: (${value})`);
                    if(options.allowNulls) 
                        value = null;
                    
                    if(options.throwError) 
                        throw new Error('Invalid length; the value will not be assigned!');
                }
            }
        });
    }
}