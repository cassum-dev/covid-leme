<script>
import { Line } from 'vue-chartjs';

export default {
    extends: Line,
    props: ['chartData'],
    data () {
        return {
            chartdata: this.chartData,
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
