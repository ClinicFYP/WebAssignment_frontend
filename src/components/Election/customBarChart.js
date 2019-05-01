import { Bar, mixins } from 'vue-chartjs'

export default {
  extends: Bar,
  props: ['chartData'],
  data: () => ({
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          },
          gridLines: {
            display: true
          }
        }],
        xAxes: [ {
          gridLines: {
            display: false
          }
        }]
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: true,
        mode: 'single',
        callbacks: {
          label: function (tooltipItems, data) {
            return tooltipItems.yLabel
          }
        }
      },
      responsive: true,
      maintainAspectRatio: false
    }
  }),
  mixins: [mixins.reactiveProp],
  watch: {
    'chartData' (to, from) {
      this.render()
    }
  },
  mounted () {
    this.render()
  },
  methods: {
    render () {
      this.renderChart(this.chartData, this.options)
    }
  }
}
