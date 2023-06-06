import "./css.escape.js";

/**
 * Await this function to sleep for a given number of milliseconds
 * 
 * @param {*} ms number of milliseconds to sleep for
 * @returns Promise that resolves after ms milliseconds
 */
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/** Returns a random integer between min and max, inclusive
 * 
 * @param {*} min the minimum value 
 * @param {*} max the maximum value
 * @returns the random integer
 */
export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

/**
 * 
 * @param {*} name selector name to be escaped
 * @returns a selector of an id with the given name
 */
export function toId(name) {
    return "#" + CSS.escape(name);
}

/**
 * 
 * @param {*} name selector name to be escaped
 * @returns a selector of a class with the given name
 */
export function toClass(name) {
    return "." + CSS.escape(name);
}