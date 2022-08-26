import { action, computed, makeObservable, observable } from "mobx";
import { API_URL, INTERVAL, SYMBOL } from "../config";
import { ICandlestick, ITicker } from "../types";

export class TradeStore {
  @observable
  protected _candlesticks: ICandlestick[];

  @observable
  protected _ticker: ITicker | null;

  constructor() {
    this._ticker = null;
    this._candlesticks = [];

    makeObservable(this);
  }

  @action
  async fetchCandlesticks() {
    const json = await fetch(
      `${API_URL}/klines?symbol=${SYMBOL}&interval=${INTERVAL}&limit=300`
    ).then((res) => res.json());

    this._candlesticks = json.map(
      (item: any[]): ICandlestick => ({
        symbol: SYMBOL,
        eventTime: Date.now(),
        startTime: item[0],
        endTime: item[6],
        interval: INTERVAL,
        openPrice: item[1],
        closePrice: item[4],
        highPrice: item[2],
        lowPrice: item[3],
        baseAssetVolume: item[5],
        numberOfTrades: item[8],
        closed: false,
        quoteAssetVolume: item[7],
      })
    );
  }

  @action
  pushCandlestick(candlestick: ICandlestick) {
    const index = this._candlesticks.findIndex(
      (x) => x.startTime === candlestick.startTime
    );
    if (index >= 0) {
      this._candlesticks[index] = candlestick;
    } else {
      this._candlesticks.push(candlestick);
    }
  }

  @action
  setTicker(ticker: ITicker) {
    this._ticker = ticker;
  }

  @computed
  get series() {
    const data = this._candlesticks.map((c) => [
      c.startTime,
      Number(c.openPrice),
      Number(c.highPrice),
      Number(c.lowPrice),
      Number(c.closePrice),
    ]);

    return [{ data }];
  }

  @computed
  get ticker() {
    return this._ticker;
  }
}
