import { IMessage } from "../types";

export const parseMessage = (event: any): IMessage => {
  const { k, s, E, e } = event;
  if (e === "24hrTicker") {
    return {
      type: "24hrTicker",
      data: {
        eventTime: event.E,
        symbol: event.s,
        priceChange: Number(event.p),
        priceChangePercent: Number(event.P),
        weightedAveragePrice: Number(event.w),
        firstTradePrice: Number(event.x),
        lastPrice: Number(event.c),
        lastQuantity: Number(event.Q),
        bestBidPrice: Number(event.b),
        bestBidQuantity: Number(event.B),
        bestAskPrice: Number(event.a),
        bestAskQuantity: Number(event.A),
        openPrice: Number(event.o),
        highPrice: Number(event.h),
        lowPrice: Number(event.l),
        totalTradedBaseAssetVolume: Number(event.v),
        totalTradedQuoteAssetVolume: Number(event.q),
        statisticsOpenTime: event.O,
        statisticsCloseTime: event.C,
        firstTradeId: event.F,
        lastTradeId: event.L,
        totalNumberOfTrades: event.n,
      },
    };
  }
  return {
    type: "kline",
    data: {
      symbol: s,
      eventTime: E,
      startTime: k.t,
      endTime: k.T,
      interval: k.i,
      openPrice: Number(k.o),
      closePrice: Number(k.c),
      highPrice: Number(k.h),
      lowPrice: Number(k.l),
      baseAssetVolume: Number(k.v),
      numberOfTrades: k.n,
      closed: k.x,
      quoteAssetVolume: Number(k.q),
    },
  };
};
