export interface EmailOptions {
    throwError?: boolean;
}

export function Email(emailOptions?: EmailOptions) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return function(target: Object, propertyKey: string | symbol) {
        let value = target[propertyKey];
        Reflect.deleteProperty[propertyKey];
        Reflect.defineProperty(target, propertyKey, {
            // Getter
            get: () => value,

            // Setter
            set: (val) => {
                console.log('Valid? ', regex.test(val));
                /*if(val <= maxValue) {
                    // The value is less or equals
                    value = val;
                } else {
                    if(!protect) value = null;
                    if(throwError) throw new Error(throwError);
                }*/
            }
        });
    }
}