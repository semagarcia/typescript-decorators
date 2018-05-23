/**
 * Decorator for making a number to have a fixed number of decimals
 * 
 * @param {number} [decimalLength] Number of decimals; default value = 2
 * @returns {PropertyDecorator}
 */
export function ToFixedLength(decimalLength?: number): PropertyDecorator {

    // Decorator
    return function(target: Object, propertyKey: string | symbol) {
        let value: number = target[propertyKey];
        Reflect.deleteProperty[propertyKey];
        Reflect.defineProperty(target, propertyKey, {
            // Getter
            get: () => value,

            // Setter
            set: (val: number) => {
                value = Number(val.toFixed((decimalLength) ? decimalLength : 2));
            }
        });
    }

}
