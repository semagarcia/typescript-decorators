
export function ToFixedLength(decimalLength?: number) {

    // Decorator
    return function(target: Object, propertyKey: string | symbol) {
        let value: number = target[propertyKey];
        Reflect.deleteProperty[propertyKey];
        Reflect.defineProperty(target, propertyKey, {
            // Getter
            get: () => value,

            // Setter
            set: (val: number) => {
                value = Number(val.toFixed(2));
            }
        });
    }

}
