export interface LoggerPropertyOptions {
    /** Flag to log property accesses (getter) */
    getter?: boolean;

    /** String to prepend to the log trace */
    prefix?: string;

    /** Flag to log property assignments (setter) */
    setter?: boolean;
}

/**
 * Decorator to log property accesses (getters and/or setters)
 * 
 * @export
 * @param {LoggerPropertyOptions} [loggerOptions] 
 * @returns 
 */
export function LoggerProperty(loggerOptions?: LoggerPropertyOptions) {
    const getter = (loggerOptions && 'getter' in loggerOptions) ? !!loggerOptions.getter : true;
    const prefix = (loggerOptions && loggerOptions.prefix) ? (loggerOptions.prefix + ' ') : '';
    const setter = (loggerOptions && 'setter' in loggerOptions) ? !!loggerOptions.setter : true;
    return function(target: Object, propertyKey: string | symbol) {
        let value = target[propertyKey];
        Reflect.deleteProperty[propertyKey];
        Reflect.defineProperty(target, propertyKey, {
            get: () =>  {
                if(getter) console.log(`${prefix}Getting value for field "${propertyKey}":`, value);
                return value;
            },
            set: (val) => {
                if(setter) console.log(`${prefix}Setting value for field "${propertyKey}":`, val);
                value = val;
            }
        });
    }
}