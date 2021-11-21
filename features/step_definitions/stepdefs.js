const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const { Builder, By, Capabilities} = require('selenium-webdriver');
require("chromedriver");

const capabilities = Capabilities.chrome();
capabilities.set('chromeOptions', { "w3c": false });
const driver = new Builder().withCapabilities(capabilities).build();

Given('Eu estou na pagina do CVkeep', async function () {
    await driver.get('https://cvkeep.com/');
    await driver.manage().window().setRect({ width: 1936, height: 1056 })
});

When('Eu pesquiso por {string}', async function (name) {
    await driver.findElement(By.name("subject")).click()
    await driver.findElement(By.name("subject")).sendKeys(name)
    await driver.findElement(By.css("button > .fa")).click()
});

Then('O primeiro perfil deve ter um nome que começa com {string}', async function (name) {
    await driver.sleep(3 * 1000)

    text = await driver.findElement(By.css(".result-card:nth-child(1) .result-card__body span")).getText()
    firstWord = text.split(" ")[0]
    assert(firstWord == name)
    await driver.quit();
});