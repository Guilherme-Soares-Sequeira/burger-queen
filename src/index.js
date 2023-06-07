import puppeteer, { Browser, Page } from "puppeteer-core";
import { executablePath } from 'puppeteer';
import { sleep, randomInt, toId, toClass, randomUniqueInts, oneInX, chooseOneAtRandom, chooseXAtRandom, generateMultipleChoiceQuestionLabels } from './utils.js'

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
        return new Promise(resolve => setTimeout(resolve, 500));
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
        return new Promise(resolve => setTimeout(resolve, 500));
    }

    async select(selector, value) {
        await this.page.waitForSelector(selector);
        await this.page.select(selector, value);
        return new Promise(resolve => setTimeout(resolve, 500));
    }

    async goToNextPage() {
        const nextButton = "NextButton";
        await sleep(900);
        await this.click(toId(nextButton));
        return new Promise(resolve => setTimeout(resolve, 500));
    }

    //QID121-4-12-col-label
    //QR-QID121-4-12-col-label

    async dealWithRadioButtons(selectorStart, satisfiedMin, satisfiedMax, tableRows) {
        for (let i = 0; i < tableRows.length; i++) {
            const row = tableRows[i];

            const howSatisfied = randomInt(satisfiedMin, satisfiedMax);
            const buttonLabel = `${selectorStart}\\~${row}\\~${howSatisfied}`;

            await this.page.evaluate((buttonLabel) => {
                const use = "#" + buttonLabel;
                document.querySelector(use).click();
            }, buttonLabel);
            await sleep(500);
        }            
    }

    async firstPage() {
        const firstSID = "QR~QID4";
        
        // todo pedir um ao utilizador
        await this.type(toId(firstSID), "21595");

        await this.goToNextPage();
        return new Promise(resolve => setTimeout(resolve, 500));
    }

    async secondPage() {
        const sndDate = "QR~QID118~2";
        const sndDateHighlighted = "ui-state-highlight";
        const sndHour = "QR~QID8#1~1";
        const sndMin = "QR~QID8#2~1";
        const sndAmPm = "QR~QID8#3~1";

        await this.click(toId(sndDate));
        await this.click(toClass(sndDateHighlighted));

        const date = new Date();
        date.setTime(Date.now());
        let hours = date.getHours();
        const ampm = hours < 12 ? 1 : 2;
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'

        await this.select(toId(sndHour), `${hours}`);
        await this.select(toId(sndMin), `${date.getMinutes()+1}`);
        await this.select(toId(sndAmPm), `${ampm}`);

        await this.goToNextPage();
        return new Promise(resolve => setTimeout(resolve, 500));
    }

    async thirdPage() {
        const selfServiceButton = "QID12-1-label";
        await this.click(toId(selfServiceButton));
        await this.goToNextPage();
        return new Promise(resolve => setTimeout(resolve, 500));
    }

    async fourthPage() {
        const dineInButton = "QID14-2-label";
        await this.click(toId(dineInButton));
        await this.goToNextPage();
        return new Promise(resolve => setTimeout(resolve, 500));
    }

    async fifthPage() {
        const howSatisfied = randomInt(17, 18);
        const buttonLabel = `QID18-${howSatisfied}-label`
        await this.click(toId(buttonLabel));
        await this.goToNextPage();
        return new Promise(resolve => setTimeout(resolve, 500));
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

        for (let i = 0; i < selectedPhrases.length; i++) {
            const phrase = selectedPhrases[i];
            await this.type(toId(textAreaLabel), phrase+"\n");
        }

        await this.goToNextPage();
        return new Promise(resolve => setTimeout(resolve, 500));
    }

    async seventhPage() {
        await this.dealWithRadioButtons("QR\\~QID121", 12, 14, [4, 5, 10, 11, 13, 16]);
        await this.goToNextPage();
        return new Promise(resolve => setTimeout(resolve, 500));
    }

    async eighthPage() {

        await this.dealWithRadioButtons("QR\\~QID123", 12, 14, [7, 9]);

        await this.goToNextPage();
        return new Promise(resolve => setTimeout(resolve, 500));
    }

    async ninthPage() {
        let howSatisfied = randomInt(29, 30);
        if (oneInX(4)) {
            howSatisfied = 8;
        }
        if (oneInX(4)) {
            howSatisfied = 33;
        }

        const buttonLabel = `QID122-${howSatisfied}-label`;

        await this.click(toId(buttonLabel));

        await this.goToNextPage();
        return new Promise(resolve => setTimeout(resolve, 500));
    }

    async tenthPage() {
        await this.dealWithRadioButtons("QR\\~QID21", 12, 14, [1, 2, 3, 20]);

        await this.goToNextPage();
        return new Promise(resolve => setTimeout(resolve, 500));
    }


    async eleventhPage() {
        await this.dealWithRadioButtons("QR\\~QID22", 8, 10, [1, 2, 3, 4]);

        await this.goToNextPage();
        return new Promise(resolve => setTimeout(resolve, 500));
    }

    async twelfthPage() {
        const buttonLabel = "QID38-2-label";
        await this.click(toId(buttonLabel));

        await this.goToNextPage();
        return new Promise(resolve => setTimeout(resolve, 500));
    }

    async thirteenthPage() {
        await this.dealWithRadioButtons("QR\\~QID41", 6, 7, [1, 2]);

        await this.goToNextPage();
        return new Promise(resolve => setTimeout(resolve, 500));
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

        await this.click(toId(choice));

        await this.goToNextPage();
        return new Promise(resolve => setTimeout(resolve, 500));
    }

    async fifteenthPage() {
        let choice = undefined;

        choice = "QID47-118-label"


        await this.click(toId(choice));

        await this.goToNextPage();
        return new Promise(resolve => setTimeout(resolve, 500));
    }

    async sixteenthPage() {
        const choice = chooseOneAtRandom(generateMultipleChoiceQuestionLabels("QID48", 12, 14));

        await this.click(toId(choice));

        await this.goToNextPage();
        return new Promise(resolve => setTimeout(resolve, 500));
    }

    async seventeenthPage() {
        await this.dealWithRadioButtons("QR\\~QID49", 12, 14, [1, 2, 3, 4, 5, 6, 7, 8, 9]);

        await this.goToNextPage();
        return new Promise(resolve => setTimeout(resolve, 500));
    }

    async eighteenthPage() {
        const choice = chooseOneAtRandom(generateMultipleChoiceQuestionLabels("QID50", 1, 3));

        await this.click(toId(choice));

        await this.goToNextPage();
        return new Promise(resolve => setTimeout(resolve, 500));
    }

    async nineteenthPage() {
        await this.goToNextPage();
        return new Promise(resolve => setTimeout(resolve, 500));
    }

    async twentiethPage() {
        const choice = chooseOneAtRandom(generateMultipleChoiceQuestionLabels("QID55", 1, 3));
        
        await this.click(toId(choice));
        await this.goToNextPage();
        
        if (choice !== "QID55-1-label") {
            await this.click(toId("QID56-2-label"));
            await this.goToNextPage();
        }

        return new Promise(resolve => setTimeout(resolve, 500));
    }

    async twentyFirstPage() {
        const choice = oneInX(5) ? "QID57-1-label" : "QID57-2-label";

        await this.click(toId(choice));

        await this.goToNextPage();
        return new Promise(resolve => setTimeout(resolve, 500));
    }

    async twentySecondPage() {
        const choice = chooseOneAtRandom(generateMultipleChoiceQuestionLabels("QID60", 1, 3));

        await this.click(toId(choice));

        await this.goToNextPage();
        return new Promise(resolve => setTimeout(resolve, 500));
    }

    async twentyThirdPage() {
        const choice = chooseOneAtRandom(generateMultipleChoiceQuestionLabels("QID61", 3, 5));

        await this.click(toId(choice));

        await this.goToNextPage();
        return new Promise(resolve => setTimeout(resolve, 500));
    }

    async twentyFourthPage() {
        const choice = chooseOneAtRandom(generateMultipleChoiceQuestionLabels("QID62", 1, 8));

        await this.click(toId(choice));

        await this.goToNextPage();
        return new Promise(resolve => setTimeout(resolve, 500));
    }

    async twentyFifthPage() {
        const buttonLabel = "QID78-2-label";
        try {
            await this.page.waitForSelector(toId(buttonLabel), {timeout: 5000});
            await this.page.click(toId(buttonLabel));
        }
        catch (e) {}

        await this.goToNextPage();
        return new Promise(resolve => setTimeout(resolve, 500));
    }

    async twentySixthPageAndBeyond() {
        while (true) {
            if ((await this.page.$$(toId("NextButton"))).length === 0) {
                await sleep(1200);
                const code = await this.page.evaluate(() => {
                    const elem = document.querySelector("#EndOfSurvey");
                    console.log("elem = " + elem);
                    console.log("elem's innerHTML = " + elem.innerHTML);
                    return elem.innerHTML.split("\n").filter((s) => s.includes("Código de validação"))[0].split(":")[1].trim().replace("<br>", "");
                });
                console.log(code);
                return new Promise(resolve => setTimeout(resolve, 500));
            }
            await this.goToNextPage();
        }
    }

    async run() {
        await this.initialize();

        // avoid filling the stack with nested function calls
        await this.firstPage();
        await this.secondPage();
        await this.thirdPage();
        await this.fourthPage();
        await this.fifthPage();
        await this.sixthPage();
        await this.seventhPage();
        await this.eighthPage();
        await this.ninthPage();
        await this.tenthPage();
        await this.eleventhPage();
        await this.twelfthPage();
        await this.thirteenthPage();
        await this.fourteenthPage();
        await this.fifteenthPage();
        await this.sixteenthPage();
        await this.seventeenthPage();
        await this.eighteenthPage();
        await this.nineteenthPage();
        await this.twentiethPage();
        await this.twentyFirstPage();
        await this.twentySecondPage();
        await this.twentyThirdPage();
        await this.twentyFourthPage();
        await this.twentyFifthPage();
        await this.twentySixthPageAndBeyond();
        this.browser.close();
    }
}

const bot = new BurgerQueen();
bot.run();