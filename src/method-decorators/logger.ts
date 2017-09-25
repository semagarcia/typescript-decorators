import { printTimeStamp } from './../utils';

export interface LoggerMethodAnnotation {
    /** Flag to trace the beginning of decorated method */
    entryTrace?: boolean;

    /** Flag to trace the end of decorated method */
    endTrace?: boolean;

    /** String to prepend to the log trace */
    prefix?: string;

    /** Flag to either insert or not a timestamp value in format [dd/MM/YYYY - hh:mm:ss] */
    timestamp?: boolean;
}

/**
 * Logger decorator to trace the beginning and/or the end of a method
 * 
 * @export
 * @param {*} loggerOptions 
 * @returns {MethodDecorator} 
 */
export function LoggerMethod(loggerOptions?: LoggerMethodAnnotation): MethodDecorator {
    // ToDo: Change by => opts = { loggerOptions.XXX } and reference a unified/unique local object
    const entryTrace = loggerOptions && !!loggerOptions.entryTrace;
    const endTrace = loggerOptions && !!loggerOptions.endTrace;
    const prefix = (loggerOptions && loggerOptions.prefix) ? (loggerOptions.prefix + ' ') : '';
    const timestamp = loggerOptions && !!loggerOptions.timestamp;

    // descriptor: TypedPropertyDescriptor<Function>
    return function(target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
        // save a reference to the original method this way we keep the values currently in the
        // descriptor and don't overwrite what another decorator might have done to the descriptor.
        if(descriptor === undefined) {
            descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
        }

        // Editing the descriptor/value parameter
        var originalMethod = descriptor.value;
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var a = args.map(function (a) { return JSON.stringify(a); }).join();

            let startTime = Date.now();
            if(entryTrace) {
                console.log(`${prefix}${printTimeStamp()}Entering in "${propertyKey}" method`);
            }

            // note usage of originalMethod here
            var result = originalMethod.apply(this, args);

            if(endTrace) {
                let endTime = Date.now();
                console.log(`${prefix}${printTimeStamp()}Exiting from "${propertyKey}" method`);
                console.log(`${prefix}${printTimeStamp()}Time took: ${endTime - startTime}ms`);
            }

            var r = JSON.stringify(result);
            console.log(`${prefix}${printTimeStamp()}Call: ${propertyKey}(${a}) => ${r}`);
            return result;
        };

        // return edited descriptor as opposed to overwriting the descriptor
        return descriptor;
    }
}
