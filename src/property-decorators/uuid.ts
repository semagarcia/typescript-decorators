/**
 * 
 */
export interface UUIDOptions {
    /** */
    protect?: boolean;

    /** */
    throwError?: boolean;
}

/**
 * 
 * 
 * @param {UUIDOptions} [uuidOptions] 
 * @returns 
 */
export function UUID(uuidOptions?: UUIDOptions): PropertyDecorator {
    
    /**
     * 
     */
    return function(target: Object, propertyKey: string | symbol) {
        let value = target[propertyKey];
        Reflect.deleteProperty[propertyKey];
        Reflect.defineProperty(target, propertyKey, {
            // Getter
            get: () => value,

            // Setter
            set: (val) => {
                /*if(regex.test(val)) {
                    value = val;
                } else {
                    if(!protect) value = null;
                    if(throwError) throw new Error('Invalid email address format');
                }*/
            }
        });
    }
}