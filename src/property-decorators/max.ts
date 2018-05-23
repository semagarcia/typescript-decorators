/**
 * Decorator to set and guarantee a maximum value for a property
 * 
 * @param {number} [maxValue] The maximum value allowed
 * @param {boolean} [protect=false] When this flag is false (the default value), if the user tries 
 * to assign a higher level, this decorator will set a null value, overriding the last right value 
 * assigned
 * @param {string} [throwError] Message to throw when the constraint is not satisfied
 * @returns {PropertyDecorator}
 */
export function Max(maxValue: number, protect: boolean = false, throwError?: string): PropertyDecorator {
    return function(target: Object, propertyKey: string | symbol) {
        let value = target[propertyKey];
        Reflect.deleteProperty[propertyKey];
        Reflect.defineProperty(target, propertyKey, {
            // Getter
            get: () => value,

            // Setter
            set: (val) => {
                if(val <= maxValue) {
                    // The value is less or equals
                    value = val;
                } else {
                    if(!protect) value = null;
                    if(throwError) throw new Error(throwError);
                }
            }
        });
    }
}