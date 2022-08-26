export type ICandlestick = {
  symbol: string;
  eventTime: number;
  startTime: number;
  endTime: number;
  interval: string;
  openPrice: number;
  closePrice: number;
  highPrice: number;
  lowPrice: number;
  baseAssetVolume: number;
  numberOfTrades: number;
  closed: boolean;
  quoteAssetVolume: number;
};

export type ITicker = {
  eventTime: number;
  symbol: string;
  priceChange: number;
  priceChangePercent: number;
  weightedAveragePrice: number;
  firstTradePrice: number;
  lastPrice: number;
  lastQuantity: number;
  bestBidPrice: number;
  bestBidQuantity: number;
  bestAskPrice: number;
  bestAskQuantity: number;
  openPrice: number;
  highPrice: number;
  lowPrice: number;
  totalTradedBaseAssetVolume: number;
  totalTradedQuoteAssetVolume: number;
  statisticsOpenTime: number;
  statisticsCloseTime: number;
  firstTradeId: string;
  lastTradeId: string;
  totalNumberOfTrades: number;
};

export type IMessage = {
  type: "24hrTicker" | "kline";
  data: ICandlestick | ITicker;
};
