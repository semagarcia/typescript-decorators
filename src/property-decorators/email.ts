export interface EmailOptions {
    protect?: boolean;
    throwError?: boolean;
}

export function Email(emailOptions?: EmailOptions) {
    const protect = (emailOptions && emailOptions.protect) ? emailOptions.protect : true;
    const throwError = (emailOptions && emailOptions.throwError) ? emailOptions.throwError : false;
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return function(target: Object, propertyKey: string | symbol) {
        let value = target[propertyKey];
        Reflect.deleteProperty[propertyKey];
        Reflect.defineProperty(target, propertyKey, {
            // Getter
            get: () => value,

            // Setter
            set: (val) => {
                if(regex.test(val)) {
                    val = value;
                } else {
                    if(!protect) value = null;
                    if(throwError) throw new Error('Invalid email address format');
                }
            }
        });
    }
}