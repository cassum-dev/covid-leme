<script>
import { Bar } from 'vue-chartjs';

export default {
    extends: Bar,
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
