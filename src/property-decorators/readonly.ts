/**
 * Interface for ReadOnly decorator
 */
export interface ReadOnlyOptions {
    /** Value to assign */
    value: any;

    /** Flag to throw or not an error */
    throwError?: boolean;
}

/**
 * Decorator to protect a property, preventing to be writable
 * 
 * @param {ReadOnlyOptions} [options] Decorator configuration object 
 * @returns {PropertyDecorator}
 */
export function ReadOnly(options: ReadOnlyOptions): PropertyDecorator {
    if(!options || !('value' in options) || !options.value)
        throw new Error('Value has to be provided!')
    return function(target: Object, propertyKey: string | symbol) {
        let value = (typeof(options.value) === 'function') ? options.value() : options.value;
        Reflect.deleteProperty[propertyKey];
        Reflect.defineProperty(target, propertyKey, {
            // Getter
            get: () => value,

            // Setter
            set: (val: any) => {
                if(options.throwError) 
                    throw new Error(`The property "${propertyKey}" is flagged as readonly!`);
            }
        });
    }
}
