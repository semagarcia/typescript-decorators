/**
 * 
 * 
 * @export
 * @param {number} minValue 
 * @param {boolean} [protect=false] When this flag is false (the default value), if the user tries to assign a lower
 *                  value, this decorator will set a null value, overriding the last right value assigned
 * @param {string} [throwError] 
 * @returns 
 */
export function Min(minValue: number, protect: boolean = false, throwError?: string) {
    return function(target: Object, propertyKey: string | symbol) {
        let value = target[propertyKey];
        Reflect.deleteProperty[propertyKey];
        Reflect.defineProperty(target, propertyKey, {
            // Getter
            get: () => value,

            // Setter
            set: (val) => {
                if(val >= minValue) {
                    // The value is equal or greater
                    value = val;
                } else {
                    if(!protect) value = null;
                    if(throwError) throw new Error(throwError);
                }
            }
        });
    }
}