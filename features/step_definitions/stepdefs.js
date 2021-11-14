const assert = require('assert');
const { Given, When, Then , AfterAll} = require('@cucumber/cucumber');
const { Builder, By, Capabilities, Key, until } = require('selenium-webdriver');
require("chromedriver");

function isItFriday(today) {
    if (today === "Friday") {
        return "TGIF";
    } else {
        return "Nope";
    }
}

// friday
Given('today is {string}', function (givenDay) {
    this.today = givenDay;
});

When('I ask whether it\'s Friday yet', function () {
    this.actualAnswer = isItFriday(this.today);
});

Then('I should be told {string}', function (expectedAnswer) {
    assert.strictEqual(this.actualAnswer, expectedAnswer);
});

//cv keep
const capabilities = Capabilities.chrome();
capabilities.set('chromeOptions', { "w3c": false });
const driver = new Builder().withCapabilities(capabilities).build();

Given('I am on the cvkeep webpage', async function () {
    await driver.get('https://cvkeep.com/');
    await driver.manage().window().setRect({ width: 1936, height: 1056 })
});

When('I search for {string}', async function (name) {
    await driver.findElement(By.name("subject")).click()
    await driver.findElement(By.name("subject")).sendKeys(name)
    await driver.findElement(By.css("button > .fa")).click()
});

Then('the first profile should start with {string}', async function (name) {
    await driver.sleep(3 * 1000)

    text = await driver.findElement(By.css(".result-card:nth-child(1) .result-card__body span")).getText()
    firstWord = text.split(" ")[0]
    assert(firstWord == name)
    await driver.quit();
});