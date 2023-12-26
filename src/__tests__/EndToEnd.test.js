import puppeteer from "puppeteer";

describe("show/hide an events details", () => {
  test("An event element is collapsed by default", async () => {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.goto("http://localhost:3000/letsmeet");

    await page.waitForSelector(".event");

    const eventDetails = await page.waitForSelector(".details");

    expect(eventDetails).toBeNull();
    browser.close();
  });
});
