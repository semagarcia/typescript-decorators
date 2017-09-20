export interface LoggerMethodAnnotation {
    entryTrace?: boolean;
    endTrace?: boolean;
    prefix?: string;
    timestamp?: boolean;
}

/**
 * 
 * 
 * @export
 * @param {*} param 
 * @returns {MethodDecorator} 
 */
export function LoggerMethod(loggerOptions?: LoggerMethodAnnotation): MethodDecorator {
    // ToDo: Change by => opts = { loggerOptions.XXX } and reference a unified/unique local object
    const entryTrace = loggerOptions && !!loggerOptions.entryTrace;
    const endTrace = loggerOptions && !!loggerOptions.endTrace;
    const prefix = (loggerOptions && loggerOptions.prefix) ? (loggerOptions.prefix + ' ') : '';
    const timestamp = loggerOptions && !!loggerOptions.timestamp;

    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
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

/**
 * 
 * Print a timestamp date if the following format: dd/MM/YYYY HH:mm:ss
 * 
 * @returns 
 */
function printTimeStamp() {
    const now = new Date();
    return ''.concat('[')
            .concat(`${now.getDate()}`)
            .concat(`/${(now.getMonth()+1 < 10) ? ("0" + (now.getMonth()+1)) : now.getMonth()+1}`)
            .concat(`/${now.getFullYear()}`)
            .concat(' ')
            .concat(`${(now.getHours() < 10) ? "0" + now.getHours() : now.getHours()}`)  // Hours
            .concat(`:${(now.getMinutes() < 10) ? "0" + now.getMinutes() : now.getMinutes()}`)  // Mins
            .concat(`:${(now.getSeconds() < 10) ? "0" + now.getSeconds() : now.getSeconds()}`)  // Secs
            .concat('] ');
}
