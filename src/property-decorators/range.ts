/**
 * Options for Range decorator
 */
export interface RangeOptions {
    //leftOpen?: boolean;   // ToDo
    //rightOpen?: boolean;  // ToDo

    /** Max range value allowed (included) */
    max: number;

    /** Main range value allowed (included) */
    min: number;

    /** Flag to protect the value assigned or not */
    protect?: boolean;

    /** Flag to throw an error when an invalid value is been asigned */
    throwOutOfRange?: boolean;
}

/**
 * Decorator to assert that a property will only have a value between a min and a max value
 * 
 * @export
 * @param {RangeOptions} [rangeOptions] Decorator configuration object 
 * @returns {PropertyDecorator}
 */
export function Range(rangeOptions: RangeOptions): PropertyDecorator {
    // Check conditions; in case of error an exception will be thrown
    checkRangeOptions(rangeOptions);

    // Decorator
    return function(target: Object, propertyKey: string | symbol) {
        let value = target[propertyKey];
        Reflect.deleteProperty[propertyKey];
        Reflect.defineProperty(target, propertyKey, {
            // Getter
            get: () => value,

            // Setter
            set: (val) => {
                if(val >= Number(rangeOptions.min) && val <= Number(rangeOptions.max)) {
                    value = val;
                } else {
                    if(!rangeOptions.protect) value = null;
                    if(!!rangeOptions.throwOutOfRange) throw new Error('Value out of range!');
                }
            }
        });
    }
}

/**
 * Check if the annotations provided are valid or not
 * 
 * @param {any} opts 
 */
function checkRangeOptions(opts) {
    if(!opts) {
        throw new Error('No range options provided');
    } else if(opts && Number.isNaN(opts.min)) {
        throw new Error('The min range value is mandatory');
    } else if(opts && Number.isNaN(opts.max)) {
        throw new Error('The max range value is mandatory');
    } else if(Number(opts.min) >= Number(opts.max)) {
        throw new Error('The min range value has to be less than max value');
    }
}