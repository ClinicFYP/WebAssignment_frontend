import { Pie, mixins } from 'vue-chartjs'

export default {
  extends: Pie,
  props: {
    chartdata: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    options: {
      responsive: true,
      maintainAspectRatio: false,
      tooltips: {
        enabled: true,
        callbacks: {
          label: function (tooltipItem, data) {
            var dataset = data.datasets[tooltipItem.datasetIndex]
            var meta = dataset._meta[Object.keys(dataset._meta)[0]]
            var total = meta.total
            var currentValue = dataset.data[tooltipItem.index]
            var title = meta.data[tooltipItem.index]._model.label
            var percentage = parseFloat((currentValue / total * 100).toFixed(1))
            return title + ' (' + percentage + '%)'
          }
        }
      }
    }
  }),
  mixins: [mixins.reactiveProp],
  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
