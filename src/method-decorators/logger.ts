/**
 * Decorator to log method calls
 */
export function LoggerMethod(param: any): MethodDecorator {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        // save a reference to the original method this way we keep the values currently in the
        // descriptor and don't overwrite what another decorator might have done to the descriptor.
        if(descriptor === undefined) {
        descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
        }
        var originalMethod = descriptor.value;

        //editing the descriptor/value parameter
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var a = args.map(function (a) { return JSON.stringify(a); }).join();
            // note usage of originalMethod here
            var result = originalMethod.apply(this, args);
            var r = JSON.stringify(result);
            console.log("Call: " + propertyKey + "(" + a + ") => " + r);
            return result;
        };

        // return edited descriptor as opposed to overwriting the descriptor
        return descriptor;
    }
}
