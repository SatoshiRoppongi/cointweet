import { CoinGeckoClient } from '~/plugins/coingecko'

export const state = () => ({
  loaded: true,
  dataCollection: {},
  options: {
    responsive: true,
    maintainAspectRation: true,
    legend: {
      display: true,
    },
  },
})

export const mutations = {
  setLoaded(state, payload) {
    state.loaded = payload
  },
  setDataCollection(state, payload) {
    state.dataCollection = payload
  },
  setOptions(state, payload) {
    state.options = payload
  },
}

export const actions = {
  async getChart({ commit }, payload) {
    // そのうちpayloadにティッカー'bitcoin'を含めるかも
    console.log('test')
    console.log(payload)
    await CoinGeckoClient.coins
      .fetchMarketChart('bitcoin', payload)
      .then((retValue) => {
        // ラベル(日付)
        const labels = retValue.data.prices.map((point) =>
          new Date(point[0]).toLocaleDateString()
        )
        console.log(labels)

        // 値段
        const prices = retValue.data.prices.map((point) => point[1])
        const dataCollection = {
          labels,
          datasets: [
            {
              label: 'BTC Price',
              backgroundColor: '#f87979',
              data: prices,
            },
          ],
        }
        commit('setDataCollection', dataCollection)
      })
      .catch(console.error)
  },
}
