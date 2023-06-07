import puppeteer, { Browser, Page } from "puppeteer-core";
import { executablePath } from 'puppeteer';
import { sleep, randomInt, toId, toClass, randomUniqueInts, oneInX, chooseOneAtRandom, chooseXAtRandom } from './utils.js'

/**
* BurgerQueen
* @constructor Unused, run() method handles initialization by calling the initalize() method.
*/
class BurgerQueen {

    /**
     * Handles the initialization of the bot, including the creation of the browser and the page and the navigation to the desired page.
     */
    async initialize() {
        const pageURL = "https://rbixm.qualtrics.com/jfe/form/SV_9MHgHFvPm0OEHr0?CountryCode=PRT&Q_Language=PT&PT=1";
        try {
            this.browser = await puppeteer.launch({
                args: ['--no-sandbox',],
                headless: false,
                ignoreHTTPSErrors: false,
                javascriptEnabled: true,
                executablePath: executablePath(),
            });

            this.page = await this.browser.newPage();
            await this.page.goto(pageURL);
            await this.page.waitForSelector(toId(firstSID));

        }
        catch (e) {
            console.log("Couldn't initialize the bot. :(\n Exception: " + e);
            throw new Error();
        }
    }

    /**
     * Clicks on the element with the specified selector.
     * 
     * @param {String} selector name of the selector to click, should be an ID.
     */
    async click(selector) {
        await this.page.waitForSelector(selector);
        await this.page.click(selector);
    }

    /**
     * Types the given text in the DOM element with the specified selector.
     * 
     * @param {String} selector text field selector, should be an ID. 
     * @param {String} text text to write in the text field.
     */
    async type(selector, text) {
        await this.page.waitForSelector(selector);
        await this.page.type(selector, text);
    }

    async select(selector, value) {
        await this.page.waitForSelector(selector);
        await this.page.select(selector, value);
    }

    async goToNextPage() {
        const nextButton = "NextButton";
        await sleep(2000);
        this.click(toId(nextButton));
    }

    async dealWithRadioButtons(selectorStart, satisfiedMin, satisfiedMax, tableRowMin, tableRowMax) {
        for (let i = tableRowMin; i < tableRowMax; i++) {
            const howSatisfied = randomInt(satisfiedMin, satisfiedMax);
            const buttonLabel = `${selectorStart}~${i}~${howSatisfied}`
            this.click(toId(buttonLabel));
        }
    }

    firstPage() {
        const firstSID = "QR~QID4";
        // todo pedir um ao utilizador
        this.type(toId(firstSID), "21595");
        this.goToNextPage();
    }

    secondPage() {
        const sndDate = "QR~QID118~2";
        const sndDateHighlighted = "ui-state-highlight";
        const sndHour = "QR~QID8#1~1";
        const sndMin = "QR~QID8#2~1";
        const sndAmPm = "QR~QID8#3~1";

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

        this.goToNextPage();
    }

    async thirdPage() {
        const selfServiceButton = "QID12-1-label";
        this.click(toId(selfServiceButton));
        goToNextPage();
    }

    async fourthPage() {
        const dineInButton = "QID14-2-label";
        this.click(toId(dineInButton));
        goToNextPage();
    }

    async fifthPage() {
        const howSatisfied = randomInt(17, 18);
        const buttonLabel = `QID18-${howSatisfied}-label`
        this.click(toId(buttonLabel));
        goToNextPage();
    }

    async sixthPage() {
        const phrases = [
            "A comida estava ótima!",
            "O serviço foi bom!",
            "O atendimento foi bom!",
            "O atendimento foi rápido!",
            "O atendimento foi eficiente!",
            "O atendimento foi simpático!",
            "O atendimento foi prestável!",
            "O atendimento foi atencioso!",
            "O atendimento foi profissional!",
            "O estabelecimento estava limpo!",
            "O estabelecimento estava organizado!",
        ];

        const textAreaLabel = "QR~QID117";

        const selectedPhrases = chooseXAtRandom(phrases, 3);

        for (const phrase in selectedPhrases) 
            this.type(toId(textAreaLabel), phrase);

        this.goToNextPage();
    }

    async seventhPage() {
        this.dealWithRadioButtons("QR~QID121", 12, 14, 4, 10);
        this.goToNextPage();
    }

    async eighthPage() {
        
        const howSatisfied1 = randomInt(12, 14);
        const buttonLabel1 = `QR~QID123~7~${howSatisfied1}`;
        this.click(toId(buttonLabel1));

        const howSatisfied2 = randomInt(12, 14);
        const buttonLabel2 = `QR~QID123~9~${howSatisfied2}`;
        this.click(toId(buttonLabel2));
    
        this.goToNextPage();
    }

    async ninthPage() {
        const howSatisfied = randomInt(29, 30);
        if (oneInX(4)) {
            howSatisfied = 8;
        }
        if (oneInX(4)) {
            howSatisfied = 33;
        }

        const buttonLabel = `QID122-${howSatisfied}-label`;
        
        this.click(toId(buttonLabel));

        this.goToNextPage();
    }

    async tenthPage() {
        this.dealWithRadioButtons("QR~QID21", 12, 14, 1, 5);
        
        this.goToNextPage();
    }


    async eleventhPage() {
        this.dealWithRadioButtons("QR~QID22", 8, 10, 1, 5);

        this.goToNextPage();
    }

    async twelfthPage() {
        const buttonLabel = "QID38-2-label";
        this.click(toId(buttonLabel));
        
        this.goToNextPage();
    }

    async thirteenthPage() {
        this.dealWithRadioButtons("QR~QID41", 6, 7, 1, 3);

        this.goToNextPage();
    }

    async fourteenthPage() {
        const possibleChoices = [
            "QID46-169-label",
            "QID46-294-label",
            "QID46-266-label",
            "QID46-272-label",
            "QID46-311-label",
        ];

        const choice = chooseOneAtRandom(possibleChoices);

        this.click(toId(choice));

        this.goToNextPage();
    }

    async fifteenthPage() {
        const choice = undefined;
        if (oneInX(3)) {
            if (oneInX(2)) {
                choice = "QID47-114-label";
            } 
            else {
                choice = "QID47-118-label"
            }
        }
        else {
            choice = "QID47-128-label";
        }

        this.click(toId(choice));
        
        this.goToNextPage();
    }

    async sixteenthPage() {
        const choice = chooseOneAtRandom(["QID48-12-label", "QID48-13-label", "QID48-14-label"]);

        this.click(toId(choice));

        this.goToNextPage();
    }

    async seventeenthPage() {
        this.dealWithRadioButtons("QR~QID49", 12, 14, 1, 10);

        this.goToNextPage();
    }

    async run() {
        await this.initialize();
        
        await this.firstPage();

        await this.secondPage();
    }   
}

const bot = new BurgerQueen();
bot.run();