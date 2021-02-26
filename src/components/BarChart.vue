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
                maintainAspectRatio: false,
                plugins: {
                    datalabels: {
                        align: 'left',
                        anchor: 'end',
                        display: (context) => {
                            return context.dataset.data[context.dataIndex] !== 0
                                ? 'auto'
                                : false;
                        },
                        font: {
                            lineHeight: 0.75,
                            weight: 'bold'
                        },
                        offset: 1,
                        padding: 0
                    }
                }
            }
        }
    },
    mounted () {
        this.renderChart(this.chartdata, this.options)
    }
}
</script>
