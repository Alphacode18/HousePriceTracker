const puppeteer = require('puppeteer');
const nodemailer = require('nodemailer');

let url;

async function scrapePrice(url) {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(url);
    await browser.close();
}