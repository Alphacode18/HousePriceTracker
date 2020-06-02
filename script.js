require('dotenv').config();

const puppeteer = require('puppeteer');
const nodemailer = require('nodemailer');

async function sendMail() {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.email",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });
    let info = await transporter.sendMail({
      from: '"HousePriceTracker" <skkhary@gmail.com>',
      to: "skkhary@gmail.com",
      subject: "HousePriceTracker Desired Price Obtained",
      text: "The desired price of the property has been reached.",
      html: '<h3>The desired price of the property has been reached.</h3>',
    });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

let url;

async function scrapePrice(url) {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(url);
    await browser.close();
}