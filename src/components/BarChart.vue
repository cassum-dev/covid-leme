<script>
import { Bar } from 'vue-chartjs';
import { buildDatasets } from '../services.js'

export default {
    extends: Bar,
    props: ['chartLabels', 'dataLabels', 'colors', 'data', 'useXAxis'],
    data () {
        return {
            chartdata: {
                labels: this.chartLabels,
                datasets: buildDatasets(
                    this.dataLabels,
                    this.colors,
                    this.data,
                    this.useXAxis
                ),
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    mounted () {
        this.renderChart(this.chartdata, this.options)
    }
}
</script>

