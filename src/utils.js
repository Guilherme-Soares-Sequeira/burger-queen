import "./css.escape.js";

/**
 * Await this function to sleep for a given number of milliseconds.
 * 
 * @param {number} ms number of milliseconds to sleep for
 * @returns Promise that resolves after ms milliseconds
 */
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/** 
 * Returns a random integer between min and max, inclusive.
 * 
 * @param {number} min minimum value 
 * @param {*} max maximum value
 * @returns the random integer
 */
export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

/**
 * 
 * @param {String} name selector name to be escaped
 * @returns {String} a selector of an id with the given name
 */
export function toId(name) {
    return "#" + CSS.escape(name);
}

/**
 * 
 * @param {String} name selector name to be escaped
 * @returns {String} a selector of a class with the given name
 */
export function toClass(name) {
    return "." + CSS.escape(name);
}


/** 
 * Returns an array with x unique numbers from the specified range.
 * 
 * @param {number} min minimum value 
 * @param {number} max maximum value
 * @param {number} x number of unique numbers to return
 * @returns {Array<number>} array with x unique numbers from the specified range
 */
export function randomUniqueInts(min, max, x) {
    if (max - min < x) {
        throw new Error("The range is too small to generate " + x + " unique numbers.");
    }

    let arr = [];
    while (arr.length < x) {
        let r = randomInt(min, max);
        if (arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
}

/**
 * Returns true with a probability of 1/x.
 * 
 * @param {number} x
 * @returns {boolean}
 */
export function oneInX(x) {
    return randomInt(0, x) === 0;
}

/** Returns one of the elements of the given array at random.
 * 
 * @param {Array<T>} arr
 * @returns T
 */
export function chooseOneAtRandom(arr) {
    if (arr.length === 0) {
        throw new Error("The array is empty.");
    }

    return arr[randomInt(0, arr.length)];
}

export function chooseXAtRandom(arr, x) {
    if (arr.length === 0) {
        throw new Error("The array is empty.");
    }
    const returnArr = [];

    while (returnArr.length < x) {
        let r = randomInt(0, arr.length);
        if (returnArr.indexOf(r) === -1) returnArr.push(arr[r]);
    }
    return returnArr;
}