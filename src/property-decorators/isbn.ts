/**
 * Options for ISBN decorator
 */
export interface IsbnOptions {

}

/**
 * 
 * 
 * @export
 * @param {IsbnOptions} [isbnOptions] 
 * @returns 
 */
export function ISBN(isbnOptions?: IsbnOptions): PropertyDecorator {
    
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