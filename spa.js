const fetch = require("isomorphic-fetch");

const symbols = ["SHOP", "CNR"];

async function app() {
  for await (symbol of symbols) {
    const description = await getDescription(symbol);
    console.log({ symbol, description });
  }
}

async function getDescription(symbol) {
  const response = await fetch("https://app-money.tmx.com/graphql", {
    headers: {
      accept: "*/*",
      "accept-language":
        "en-CA,en;q=0.9,es-CO;q=0.8,es;q=0.7,en-GB;q=0.6,en-US;q=0.5",
      authorization: "",
      "content-type": "application/json",
      locale: "en",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
    },
    referrer: `https://money.tmx.com/en/quote/${symbol}/company`,
    referrerPolicy: "no-referrer-when-downgrade",
    body: `{"operationName":"getQuoteBySymbol","variables":{"symbol":"${symbol}","locale":"en"},"query":"query getQuoteBySymbol($symbol: String, $locale: String) {\\n  getQuoteBySymbol(symbol: $symbol, locale: $locale) {\\n    symbol\\n    name\\n    price\\n    priceChange\\n    percentChange\\n    exchangeName\\n    exShortName\\n    exchangeCode\\n    marketPlace\\n    sector\\n    industry\\n    volume\\n    openPrice\\n    dayHigh\\n    dayLow\\n    MarketCap\\n    MarketCapAllClasses\\n    peRatio\\n    prevClose\\n    dividendFrequency\\n    dividendYield\\n    dividendAmount\\n    dividendCurrency\\n    beta\\n    eps\\n    exDividendDate\\n    shortDescription\\n    longDescription\\n    website\\n    email\\n    phoneNumber\\n    fullAddress\\n    employees\\n    shareOutStanding\\n    totalDebtToEquity\\n    totalSharesOutStanding\\n    sharesESCROW\\n    vwap\\n    dividendPayDate\\n    weeks52high\\n    weeks52low\\n    alpha\\n    averageVolume10D\\n    averageVolume30D\\n    averageVolume50D\\n    priceToBook\\n    priceToCashFlow\\n    returnOnEquity\\n    returnOnAssets\\n    day21MovingAvg\\n    day50MovingAvg\\n    day200MovingAvg\\n    dividend3Years\\n    dividend5Years\\n    datatype\\n    __typename\\n  }\\n}\\n"}`,
    method: "POST",
    mode: "cors",
  });
  const data = await response.json();
  return data.data.getQuoteBySymbol.longDescription;
}

app();
