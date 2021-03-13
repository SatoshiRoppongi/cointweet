<template>
  <div class="container">
    <div>
      <crypto-chart
        v-if="loaded"
        :chart-data="datacollection"
        :options="options"
      >
      </crypto-chart>
      {{ data }}
    </div>
  </div>
</template>

<script>
import CryptoChart from '../components/CryptoChart.vue'
export default {
  components: {
    CryptoChart,
  },
  async asyncData(context) {
    const fromDate = new Date(2017, 7, 1, 3, 15, 30)
    const toDate = new Date(2021, 2, 10, 18, 50)
    const params = {
      vs_currency: 'jpy',
      from: Math.floor(fromDate.getTime() / 1000),
      to: Math.floor(toDate.getTime() / 1000),
    }
    console.log(params)
    const CoinGecko = require('coingecko-api')
    const CoinGeckoClient = new CoinGecko()
    const retValue = await CoinGeckoClient.coins.fetchMarketChartRange(
      'bitcoin',
      params
    )
    const loaded = true
    // ラベル(日付)
    const labels = retValue.data.prices.map((point) => point[0])
    // 値段
    const prices = retValue.data.prices.map((point) => point[1])
    const datacollection = {
      labels,
      datasets: [
        {
          label: 'BTC Price',
          backgroudColor: '#f87979',
          data: prices,
        },
      ],
    }
    return { loaded, datacollection }
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
