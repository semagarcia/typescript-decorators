/**
 * Object to configure ToLowercase decorator
 */
export interface ToLowercaseOptions {
    /** Flag to determine if locale should be used */
    useLocale?: boolean;
}

/**
 * Decorator to transform a string to uppercase with options (capitalize and/or using locale)
 * 
 * @param {ToUppercaseOptions} [toUpperCaseOptions] 
 * @returns {PropertyDecorator}
 */
export function ToLowercase(toLowerCaseOptions?: ToLowercaseOptions): PropertyDecorator {
    let useLocale = (toLowerCaseOptions && 'useLocale' in toLowerCaseOptions) ? !!toLowerCaseOptions.useLocale : false;

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
                    throw new Error('The ToLowercase decorator has to be used over string object');

                // Assign the transformed value
                value = (useLocale) ? val.toLocaleLowerCase() : val.toLowerCase();
            }
        });
    }
}
