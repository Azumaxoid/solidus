'use strict';

const puppeteer = require('puppeteer');
const users = require('../users.json');
(async() => {
    const browser = await puppeteer.launch({
        headless: "new",
        slowMo: 50,
        args: ['--lang=ja', '--no-sandbox', '--disabled-setuid-sandbox'] // デフォルトでは言語設定が英語なので日本語に変更
    });
    const page = await browser.newPage();
    const wait = async (time) => {
        return new Promise((res) => {
            setTimeout(() => {
                res()
            }, time)
        })
    }

    const typeText = async (selector, value) => {
        await page.$eval(selector, element => element.value = '');
        await page.type(selector, value)
    }

    const buy = async (user) => {
        console.log(`Buy for ${user.email}`)
        await page.goto('http://localhost:3000')
        await page.click(".auth-link")
        await page.click("#spree_user_email")
        await page.type("#spree_user_email", user.email)
        await page.type("#spree_user_password", "password")
        await page.click("[name='commit']")
        await page.goto('http://localhost:3000')
        await page.click("#product_4 img")
        await page.click("#add-to-cart-button")
        await page.waitForSelector('#checkout-link', {visible: true})
        if (["kashimura_taro@nrkk.technology", "takeda_kenji@nrkk.technology"].indexOf(user.email) >= 0) {
            await page.type("#order_coupon_code", "123")
            await page.click(".coupon-code__action > .button-primary")
            return
        }
        await page.click("#checkout-link")
        await page.$eval(selector, element => element.value = '');
        await typeText("#order_bill_address_attributes_name", "Big Building")
        await typeText("#order_bill_address_attributes_address1", "Narrow Avenue")
        await typeText("#order_bill_address_attributes_address2", "Super Street")
        await typeText("#order_bill_address_attributes_city", "Kitakyushu")
        await page.click("#order_bill_address_attributes_country_id")
        await page.select('#order_bill_address_attributes_country_id', '233');
        await page.click("#order_bill_address_attributes_state_id")
        await page.select('#order_bill_address_attributes_state_id', '3435');
        await typeText("#order_bill_address_attributes_zipcode", "1234567")
        await typeText("#order_bill_address_attributes_phone", "01234567890")
        await page.click("[name='commit']")
        await wait(500);
        await page.click("[name='commit']")
        await wait(500);
        await page.click("li:nth-child(2) > label")
        await page.click("[name='commit']")
        await wait(500);
        await page.click("label")
        await page.click("[name='commit']")
    }

    for (let i = 0; i < 1000; i++) {
        try {
            await buy(users[i % users.length])
        } catch (e) {
            // Do nothing
        } finally {
            await page.goto('http://localhost:3000')
            await page.click(".auth-link")
            await page.click(".button-primary")
        }
    }
})();
