const puppeteer = require("puppeteer");

const symbols = ["AAPL", "TSLA"];

async function app() {
  for await (symbol of symbols) {
    const description = await getDescription(symbol);
    console.log({ symbol, description });
  }
}

async function getDescription(symbol) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(
    `https://ih.advfn.com/stock-market/NASDAQ/${symbol}/stock-price`
  );

  const text = await page.evaluate(() => {
    return document.querySelector("#content > .TableElement:last-child")
      .innerText;
  });

  await browser.close();

  return text;
}

app();
