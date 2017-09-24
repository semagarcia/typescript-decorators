export interface LoggerClassAnnotation {
    /** Message to write in each trace */
    messageOnLog?: string;

    /** String to prepend to the log trace */
    prefix?: string;

    /** Flag to either insert or not a timestamp value in format [dd/MM/YYYY - hh:mm:ss] */
    timestamp?: boolean;
}

/**
 * 
 * 
 * @export
 * @returns {ClassDecorator} 
 */
export function LoggerClass(loggerOptions: LoggerClassAnnotation = {}): ClassDecorator {
    // Check logger options
    const msgTrace = (loggerOptions && loggerOptions.messageOnLog) || 'New instance created of class';
    const prefix = (loggerOptions && loggerOptions.prefix) ? (loggerOptions.prefix + ' ') : '';
    const timestamp = loggerOptions && !!loggerOptions.timestamp;
    let ts: string = '';
    if(timestamp) {
        let now = new Date();
        ts = ts.concat('[') 
            .concat(`${now.getDate()}/${now.getMonth()+1}/${now.getFullYear()}`)
            .concat(' - ')
            .concat(`${now.getHours()}:${now.getMinutes()}`)
            .concat('] ');
    }

    return function <TFunction extends Function> (target: TFunction): TFunction {
        // Save a reference to the original constructor
        var original = target;
        
        // An utility function to generate instances of a class
        function construct(constructor, args) {
            var c: any = function () {
                return constructor.apply(this, args);
            }
            c.prototype = constructor.prototype;
            return new c();
        }
        
        // The new constructor behaviour
        var f: any = function (...args) {
            console.log(`${prefix}${ts}${msgTrace} ${original.name}`);
            return construct(original, args);
        }
        
        // Copy prototype so intanceof operator still works
        f.prototype = original.prototype;
        
        // Return new constructor (will override original)
        return f;
    };
}
