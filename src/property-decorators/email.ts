/**
 * Options for Email decorator
 */
export interface EmailOptions {
    /** Flag to determine if the previous value should be protected or not */
    protect?: boolean;

    /** Flag to determine if an error should be thrown when an invalid email is assigned */
    throwError?: boolean;
}

/**
 * Decorator for guarantee the email format
 * 
 * @param {EmailOptions} [emailOptions] Configuration object for Email decorator
 * @returns {PropertyDecorator}
 */
export function Email(emailOptions?: EmailOptions): PropertyDecorator {
    const protect = (emailOptions && 'protect' in emailOptions) ? emailOptions.protect : true;
    const throwError = (emailOptions && 'throwError' in emailOptions) ? emailOptions.throwError : false;
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
                    value = val;
                } else {
                    if(!protect) value = null;
                    if(throwError) throw new Error('Invalid email address format');
                }
            }
        });
    }
}