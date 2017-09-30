/**
 * Interface for ReadOnlyOptions decorator annotation
 * 
 * @export
 * @interface ReadOnlyOptions
 */
export interface ReadOnlyOptions {
    /** */
    value: any;

    /** */
    throwError?: boolean;
}

/**
 * Decorator to prevent to be writable
 * 
 * @export
 * @param {ReadOnlyOptions} options 
 * @returns 
 */
export function ReadOnly(options: ReadOnlyOptions) {
    if(!options || !('value' in options))
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
