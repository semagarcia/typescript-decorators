/**
 * Decorator to mark method as deprecated. If a message is specified, this string will be used
 * in the thrown error
 * 
 * @param {string} [deprecatedException] Message to throw when decored method is called (optional)
 * @returns {MethodDecorator}
 */
export function DeprecatedMethod(deprecatedException?: string): MethodDecorator {
    return function(target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
        descriptor.value = () => {
            throw new Error((deprecatedException) 
                ? deprecatedException 
                : 'This method has been deprecated!');
        };
        return descriptor;
    }
}
