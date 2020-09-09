const fetch = require("isomorphic-fetch");
const cheerio = require("cheerio");

const symbols = ["AAPL", "TSLA"];

async function app() {
  for await (symbol of symbols) {
    const description = await getDescription(symbol);
    console.log({ symbol, description });
  }
}

async function getDescription(symbol) {
  const response = await fetch(
    `https://ih.advfn.com/stock-market/NASDAQ/${symbol}/stock-price`
  );
  const text = await response.text();
  const $ = cheerio.load(text);
  return $("#content > .TableElement:last-child").text().trim();
}

app();
