require('dotenv').config();

const puppeteer = require('puppeteer');
const nodemailer = require('nodemailer');

async function sendMail() {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.FROM_EMAIL,
        pass: process.env.PASSWORD
      }
    });
    let info = await transporter.sendMail({
      from: '"HousePriceTracker" <auto@HousePriceTracker.com>',
      to: process.env.TO_EMAIL,
      subject: "HousePriceTracker Desired Price Obtained",
      text: "The desired price of the property has been reached.",
      html: '<h3>The desired price of the property has been reached.</h3>',
    });
    console.log("Message sent: %s", info.messageId);
}

sendMail();

let url;

async function scrapePrice(url) {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(url);
    await browser.close();
}