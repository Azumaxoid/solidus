'use strict';

const puppeteer = require('puppeteer');
const users = require('../users.json');
(async() => {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--lang=ja', '--no-sandbox', '--disabled-setuid-sandbox'] // デフォルトでは言語設定が英語なので日本語に変更
    });
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/admin')
    await page.waitForSelector('#spree_user_email', {visible: true});
    await page.type('#spree_user_email', 'admin@example.com');
    await page.type('#spree_user_password', 'test123');
    await page.click('[name="commit"]');
    const createUser = async (user) => {
        await page.click('.fa-user');
        await page.waitForSelector('#admin_new_user_link', {visible: true});
        await page.click('#admin_new_user_link');
        await page.type('#user_email', user.email);
        await page.type('#user_password', 'password');
        await page.type('#user_password_confirmation', 'password');
        await page.click('[name="commit"]');
        await new Promise((res)=>{setTimeout(()=>{res()}, 1000)})
    }

    for (let i = 0; i < users.length; i++) {
        try {
            await createUser(users[i % users.length])
        } catch (e) {
            // Do nothing
        } finally {
        }
    }
})();
