/**
 * Options for Cacheable decorator
 */
export interface CacheableAnnotation {
    /** Flag to show cache stats */
    //stats?: boolean;

    /** Selects the platform where the cache will be executed (browser or nodejs) */
    //platform?: 'browser' | 'nodejs';

    /** Selects how the cache will be implemented; by default "memory" is used */
    //storage?: 'memory' | 'localStorage' | 'sessionStorage';
}

/**
 * Decorator for caching methods
 * 
 * @param {CacheableAnnotation} [options] Options for configuring decorator 
 * @returns {MethodDecorator}
 */
export function Cacheable(options?: CacheableAnnotation): MethodDecorator {
    var memory = {};
    return function(target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
        // save a reference to the original method this way we keep the values currently in the
        // descriptor and don't overwrite what another decorator might have done to the descriptor.
        if(descriptor === undefined) {
            descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
        }

        let originalMethod = descriptor.value;
        descriptor.value = function() {
            let args = [];
            for (let _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }

            if(memory[args.toString()]) {
                console.log('Cache entry found!');
                return memory[args.toString()];
            } else {
                console.log('Cache entry not found!');
                let result = originalMethod.apply(this, args);
                memory[args.toString()] = result;
                return result;
            }
        };

        // return edited descriptor as opposed to overwriting the descriptor
        return descriptor;
    }
}