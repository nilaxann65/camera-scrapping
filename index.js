const puppeteer = require('puppeteer');
const utils = require('./utils')
const { Variables } = require("./variables");

const fileName = `file_${new Date().toISOString().replace(/:/g, '-')}`;
const dateStart = new Date("01/01/2023");
const dateEnd = new Date("04/30/2023");

(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });

    for (const city of Variables.CITIES) {
        for (const branchOffice of city.branchOffices) {
            const schedule = utils.findSchedule(branchOffice.id);
            for (const camera of branchOffice.cameras) {
                const page = await browser.newPage();
                await page.goto(camera.login_url);
                await page.waitForSelector('#username');
                await page.type('#username', city.creadentials.username);
                await page.type('#password', city.creadentials.password);
                await page.click('.btn.btn-primary.login-btn');
                await page.waitForSelector('.pointer.ng-binding')
                await page.goto(camera.report_url);
                await page.waitForSelector('.Wdate.ng-isolate-scope');

                let date = dateStart;
                while (date < dateEnd) {
                    const currentDaySchedule = schedule[date.getDay()];
                    //==============================
                    //logica para modificar la fecha
                    //==============================
                    await page.click('.btn.search-btn');
                    await page.waitForSelector('.table-body > *', { timeout: 10000 });

                    const spanTexts = await page.$$eval('.table-body > div > span', spans => {
                        return spans.map(span => span.textContent);
                    });
                    const trafic = utils.getScheduledTrafic(spanTexts, currentDaySchedule);
                    const finalResult = {
                        year: date.getFullYear(),
                        month: date.getMonth() + 1,
                        day: date.getDate(),
                        branchOffice: branchOffice.id,
                        city: city.id,
                        trafic: trafic
                    }
                    utils.uploadToFile(fileName, finalResult);
                    date.setDate(date.getDate() + 1);
                }
            }

            //aquí es el uploadToFile
        }
    }

    await browser.close();
})();
