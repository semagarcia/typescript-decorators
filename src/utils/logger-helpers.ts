/**
 * Print a timestamp date if the following format: dd/MM/YYYY HH:mm:ss
 * 
 * @export
 * @param {Date} date 
 * @returns 
 */
export function printTimeStamp(date: Date) {
    return (!date) 
        ? ''
        : ''.concat('[')
            .concat(`${(date.getDate() < 10) ? ("0" + date.getDate()) : date.getDate()}`)
            .concat(`/${(date.getMonth()+1 < 10) ? ("0" + (date.getMonth()+1)) : date.getMonth()+1}`)
            .concat(`/${date.getFullYear()}`)
            .concat(' ')
            .concat(`${(date.getHours() < 10) ? "0" + date.getHours() : date.getHours()}`)  // Hours
            .concat(`:${(date.getMinutes() < 10) ? "0" + date.getMinutes() : date.getMinutes()}`)  // Mins
            .concat(`:${(date.getSeconds() < 10) ? "0" + date.getSeconds() : date.getSeconds()}`)  // Secs
            .concat('] ');
}