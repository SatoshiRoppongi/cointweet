<template>
  <div class="container">
    <div class="chart">
      <b-form-group v-slot="{ ariaDescribedby }" label="Time span buttons">
        <b-form-radio-group
          id="btn-darios-1"
          v-model="selected"
          :options="buttonOptions"
          :aria-describedby="ariaDescribedby"
          name="radio-btn-default"
          buttons
          @change="getChart"
        >
        </b-form-radio-group>
      </b-form-group>
      <crypto-chart
        v-if="loaded"
        :chart-data="dataCollection"
        :options="options"
        :styles="myStyles"
      >
      </crypto-chart>
    </div>
  </div>
</template>

<script>
import CryptoChart from '../components/CryptoChart.vue'
export default {
  components: {
    CryptoChart,
  },
  async asyncData({ store, error }) {
    try {
      const params = {
        vs_currency: 'jpy',
        date: '1',
      }
      await store.dispatch('getChart', params)
    } catch (e) {
      return error({ message: e.message, statusCode: e.response.status })
    }
    // const loaded = true
    // ラベル(日付)
    // const options = null
    // return { loaded, datacollection, options }
  },
  data() {
    return {
      selected: '24h',
      buttonOptions: [
        { text: '24h', value: '24h', days: '1' },
        { text: '7d', value: '7d', days: '7' },
        { text: '14d', value: '14d', days: '14' },
        { text: '90d', value: '90d', days: '90' },
        { text: '180d', value: '180d', days: '180' },
        { text: '1y', value: '1y', days: '365' },
        { text: 'max', value: 'max', days: 'max' },
      ],
    }
  },
  computed: {
    dataCollection() {
      return this.$store.state.dataCollection
    },
    loaded() {
      return this.$store.state.loaded
    },
    options() {
      return this.$store.state.options
    },
    myStyles() {
      return {
        height: '100%',
        width: '100%',
        'max-width': '800px',
        position: 'relative',
      }
    },
  },
  methods: {
    async getChart() {
      const params = {
        vs_currency: 'jpy',
        days: this.buttonOptions.find(
          (selected) => selected.value === this.selected
        ).days,
      }
      await this.$store.dispatch('getChart', params)
    },
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

.chart {
  display: block;
  height: 100%;
  width: 100%;
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
