import ReactApexChart from "react-apexcharts";

export default function CandlestickChart({ series }: { series: any }) {
  return (
    <ReactApexChart
      type="candlestick"
      height="100%"
      options={{
        chart: {
          id: "basic-candlestick",
          animations: {
            enabled: false,
          },
        },
        plotOptions: {
          candlestick: {
            colors: {
              upward: "#3C90EB",
              downward: "#DF7D46",
            },
            wick: {
              useFillColor: true,
            },
          },
        },
        xaxis: {
          type: "datetime",
        },
      }}
      series={series}
    />
  );
}
