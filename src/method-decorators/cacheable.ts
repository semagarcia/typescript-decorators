export interface CacheableAnnotation {

}

export function Cacheable(options?: CacheableAnnotation) {
    return function(target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
        // save a reference to the original method this way we keep the values currently in the
        // descriptor and don't overwrite what another decorator might have done to the descriptor.
        if(descriptor === undefined) {
            descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
        }

        // Editing the descriptor/value parameter
        /*var originalMethod = descriptor.value;
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var a = args.map(function (a) { return JSON.stringify(a); }).join();


            // note usage of originalMethod here
            var result = originalMethod.apply(this, args);
            var r = JSON.stringify(result);
            console.log(`${prefix}${printTimeStamp(new Date())}Call: ${propertyKey}(${a}) => ${r}`);
            return result;
        };*/
        console.log('dv: ', descriptor);

        // return edited descriptor as opposed to overwriting the descriptor
        return descriptor;
    }
}