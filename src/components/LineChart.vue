<script>
import { Line } from 'vue-chartjs';
import { buildDatasets } from "../services.js"

export default {
    extends: Line,
    props: ['chartLabels', 'dataLabels', 'colors', 'data', 'useXAxis', 'fill'],
    data () {
        return {
            chartdata: {
                labels: this.chartLabels,
                datasets: buildDatasets(
                    this.dataLabels,
                    this.colors,
                    this.data,
                    this.useXAxis,
                    this.fill,
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
