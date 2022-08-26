import { TradeStore } from "./trade";

export class RootStore {
  public readonly tradeStore: TradeStore;

  constructor() {
    this.tradeStore = new TradeStore();
  }
}
