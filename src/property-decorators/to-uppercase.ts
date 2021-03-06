/**
 * Configuration object for ToUppercase decorator
 */
export interface ToUppercaseOptions {
    /** Floag to use capitalization or not */
    capitalize?: boolean;

    /** Flag to determine if locale should be used */
    useLocale?: boolean;
}

/**
 * Decorator to transform a string to uppercase with options (capitalize and/or using locale)
 * 
 * @param {ToUppercaseOptions} [toUpperCaseOptions] Configuration object
 * @returns {PropertyDecorator}
 */
export function ToUppercase(toUpperCaseOptions?: ToUppercaseOptions): PropertyDecorator {
    let opts = {
        capitalize: (toUpperCaseOptions && 'capitalize' in toUpperCaseOptions) ? !!toUpperCaseOptions.capitalize : false,
        useLocale: (toUpperCaseOptions && 'useLocale' in toUpperCaseOptions) ? !!toUpperCaseOptions.useLocale : false
    };

    // Decorator
    return function(target: Object, propertyKey: string | symbol) {
        let value = target[propertyKey];
        Reflect.deleteProperty[propertyKey];
        Reflect.defineProperty(target, propertyKey, {
            // Getter
            get: () => value,

            // Setter
            set: (val: string) => {
                if(typeof(val) !== 'string')
                    throw new Error('The ToUppercase decorator has to be used over string object');

                if(opts.capitalize) {
                    value = (opts.useLocale) 
                        ? val[0].toLocaleUpperCase() + val.slice(1)
                        : val[0].toUpperCase() + val.slice(1)
                } else {
                    value = (opts.useLocale) ? val.toLocaleUpperCase() : val.toUpperCase();
                }
            }
        });
    }
}
