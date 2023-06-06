import puppeteer from "puppeteer-core";
import { executablePath } from 'puppeteer';
import fs from "fs";
import "./css.escape.js";

const nextButton = "NextButton";

const firstSID = "QR~QID4";

const sndDate = "QR~QID118~2";
const sndDateHighlighted = "ui-state-highlight";

const sndHour = "QR~QID8#1~1";

const sndMin = "QR~QID8#2~1";

const sndAmPm = "QR~QID8#3~1";

/**
 * 
 * @param {*} name selector name to be escaped
 * @returns a selector of an id with the given name
 */
function toId(name) {
    return "#" + CSS.escape(name);
}

/**
 * 
 * @param {*} name selector name to be escaped
 * @returns a selector of a class with the given name
 */
function toClass(name) {
    return "." + CSS.escape(name);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

async function run() {
    console.log("Starting the bot...");
    const browser = await puppeteer.launch({
        args: ['--no-sandbox',],
        headless: false,
        ignoreHTTPSErrors: false,
        javascriptEnabled: true,
        executablePath: executablePath(),
      });
    browser.defaultBrowserContext();
    try {
        let page = await browser.newPage();
        await page.goto("https://rbixm.qualtrics.com/jfe/form/SV_9MHgHFvPm0OEHr0?CountryCode=PRT&Q_Language=PT&PT=1");
        const bodyHTML = await page.evaluate(() => document.body.innerHTML);
        fs.writeFileSync("test.html", bodyHTML);

        await page.waitForSelector(toId(firstSID));
        
        // first page
        // todo pedir um ao utilizador
        await page.type(toId(firstSID), "21595");
        await sleep(1000);

        await page.click(toId(nextButton));
        await sleep(1000);
        
        await page.waitForSelector(toId(sndDate));
        await page.click(toId(sndDate));
        await page.waitForSelector(toClass(sndDateHighlighted));
        await page.click(toClass(sndDateHighlighted));

        // second page
        await page.select(toId(sndHour), `${randomInt(1, 12)}`);
        await page.select(toId(sndMin), `${randomInt(1, 60)}`);
        await page.select(toId(sndAmPm), `${randomInt(1, 2)}`);

        await sleep(12000);
        


    }
    catch (e) {
        console.log("Couldn't get the free icecream. :(" + e);
    }
    finally {
        //await browser?.close();
    }

}

run();