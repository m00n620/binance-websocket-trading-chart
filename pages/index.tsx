import { observer } from "mobx-react-lite"
import type { NextPage } from "next"
import dynamic from "next/dynamic"
import Head from "next/head"
import numeral from "numeral"
import { useEffect, useState } from "react"
import useWebSocket from "react-use-websocket"

import { INTERVAL, SOCKET_URL, SYMBOL } from "../config"
import { useStore } from "../stores"
import { ICandlestick, ITicker } from "../types"
import { parseMessage } from "../utils"

const CandlestickChart = dynamic(() => import("../components/CandlestickChart"), { ssr: false })

const Home: NextPage = observer(() => {
  const { tradeStore } = useStore()

  const { sendMessage, lastMessage } = useWebSocket(SOCKET_URL, {
    onOpen: () => {
      const symbol = SYMBOL.toLowerCase()
      sendMessage(
        JSON.stringify({
          method: "SUBSCRIBE",
          params: [`${symbol}@ticker`, `${symbol}@kline_${INTERVAL}`],
          id: 1,
        })
      )
    },
    shouldReconnect: (closeEvent) => true,
  })

  useEffect(() => {
    tradeStore.fetchCandlesticks()
  }, [])

  useEffect(() => {
    if (!lastMessage) return
    const data = JSON.parse(lastMessage.data)
    if (data.result === null || !data.data) return

    const { type, data: msgData } = parseMessage(data.data)
    if (type === "24hrTicker") {
      tradeStore.setTicker(msgData as ITicker)
    } else {
      tradeStore.pushCandlestick(msgData as ICandlestick)
    }
  }, [lastMessage])

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto py-10">
        <div className="flex items-center">
          <div className="text-lg font-bold mr-4">
            <p className="mr-2">BTC/USDT</p>
            <span>{tradeStore.ticker && numeral(tradeStore.ticker.lastPrice).format("0,0.00$")}</span>
          </div>
          {tradeStore.ticker && (
            <div className="flex text-sm font-semibold border border-gray-600 px-4 py-2 rounded-md">
              <div className="mr-4">
                <p>24h Change</p>
                <p className={tradeStore.ticker.priceChange >= 0 ? "text-green-600" : "text-red-600"}>
                  {numeral(tradeStore.ticker.priceChange).format("0,0.00")}{" "}
                  {numeral(tradeStore.ticker.priceChangePercent).format("0,0.00")}%
                </p>
              </div>
              <div className="mr-4">
                <p>24h High</p>
                <p>{numeral(tradeStore.ticker.highPrice).format("0,0.00")}</p>
              </div>
              <div className="mr-4">
                <p>24h Low</p>
                <p>{numeral(tradeStore.ticker.lowPrice).format("0,0.00")}</p>
              </div>
              <div className="mr-4">
                <p>Total Volume</p>
                <p>{numeral(tradeStore.ticker.totalTradedQuoteAssetVolume).format("0,0.00")} USD</p>
              </div>
            </div>
          )}
        </div>
        <div className="h-[400px]">
          <CandlestickChart series={tradeStore.series} />
        </div>
      </main>
    </div>
  )
})

export default Home
