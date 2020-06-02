const puppeteer = require('puppeteer');
const nodemailer = require('nodemailer');

let city, state, country;

city = 'atlanta';
state = 'ga';
country = 'usa';

async function scrapePrice(url) {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(url);
    await browser.close();
}

const url =`https://www.sothebysrealty.com/eng/sales/${city}-${state}-${country}`;