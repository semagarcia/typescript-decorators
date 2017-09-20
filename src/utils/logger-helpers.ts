/**
 * 
 * Print a timestamp date if the following format: dd/MM/YYYY HH:mm:ss
 * 
 * @returns 
 */
export function printTimeStamp() {
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