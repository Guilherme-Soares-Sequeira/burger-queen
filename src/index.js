import puppeteer, { Browser, Page } from "puppeteer-core";
import { executablePath } from 'puppeteer';
import { sleep, randomInt, toId, toClass } from './utils.js'

const nextButton = "NextButton";

const firstSID = "QR~QID4";

const sndDate = "QR~QID118~2";
const sndDateHighlighted = "ui-state-highlight";

const sndHour = "QR~QID8#1~1";

const sndMin = "QR~QID8#2~1";

const sndAmPm = "QR~QID8#3~1";


/**
* BurgerQueen
* @constructor
*/
class BurgerQueen {

    async initialize() {
        try {
            this.browser = await puppeteer.launch({
                args: ['--no-sandbox',],
                headless: false,
                ignoreHTTPSErrors: false,
                javascriptEnabled: true,
                executablePath: executablePath(),
            });

            this.page = await this.browser.newPage();
            await this.page.goto("https://rbixm.qualtrics.com/jfe/form/SV_9MHgHFvPm0OEHr0?CountryCode=PRT&Q_Language=PT&PT=1");
            await this.page.waitForSelector(toId(firstSID));

        }
        catch (e) {
            console.log("Couldn't initialize the bot. :(\n Exception: " + e);
            throw new Error();
        }
    }

    async click(selector) {
        await this.page.waitForSelector(selector);
        await this.page.click(selector);
    }

    async type(selector, text) {
        await this.page.waitForSelector(selector);
        await this.page.type(selector, text);
    }

    async select(selector, value) {
        await this.page.waitForSelector(selector);
        await this.page.select(selector, value);
    }

    async firstPage() {
        // todo pedir um ao utilizador
        this.type(toId(firstSID), "21595");
        await sleep(2000);
        this.click(toId(nextButton));
    }

    async secondPage() {
        this.click(toId(sndDate));
        this.click(toClass(sndDateHighlighted));
        
        const date = new Date();
        date.setTime(Date.now());
        let hours = date.getHours();
        const ampm = hours < 12 ? 1 : 2;
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'

        this.select(toId(sndHour), `${hours}`);
        this.select(toId(sndMin), `${date.getMinutes()}`);
        this.select(toId(sndAmPm), `${ampm}`);

    }

    async run() {
        await this.initialize();
        
        await this.firstPage();

        await this.secondPage();
    }   
}

const bot = new BurgerQueen();
bot.run();