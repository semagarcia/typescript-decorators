/**
 * 
 * 
 * @export
 * @param {string} [deprecatedException] 
 * @returns 
 */
export function DeprecatedMethod(deprecatedException?: string) {
    return function(target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
        descriptor.value = () => {
            throw new Error((deprecatedException) ? deprecatedException : 'This method has been deprecated!');
        };
        return descriptor;
    }
}
