export interface IsbnOptions {
    /** */
    protect?: boolean;

    /** */
    throwError?: boolean;
}

/**
 * 
 * 
 * @export
 * @param {IsbnOptions} [isbnOptions] 
 * @returns 
 */
export function ISBN(isbnOptions?: IsbnOptions) {
    

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