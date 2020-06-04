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

async function scrapePrice(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: 'networkidle0'});
    const operation = await page.evaluate(() => {
      const price = document.getElementsByClassName('price__value  u-ignore-phonenumber');
      return price[0].innerText;
    });
    console.log(operation);
    await browser.close();
    return operation;
}

async function priceTracker(url, desiredPrice) {
  let emailSent = false;
  let price = scrapePrice(url);
  if (desiredPrice >= price) {
    sendMail();
    emailSent = true;
    return emailSent;
  }
}

async function main() {
  let sentValue = priceTracker('https://www.sothebysrealty.com/eng/sales/detail/180-l-1187-hnyp6r/249-south-westgate-avenue-los-angeles-ca-90049', 9500000);
  setTimeout(() => {console.log("Fetching Data");}, 2000);
}

main();