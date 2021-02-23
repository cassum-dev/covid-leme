<script>
    import { Doughnut } from "vue-chartjs"

    export default {
        extends: Doughnut,
        props: ['labels', 'colors', 'data'],
        data () {
            return {
                chartdata: {
                    labels: this.labels,
                    datasets: [
                        {
                            label: 'Covid Leme',
                            backgroundColor: this.colors,
                            data: this.data,
                        }
                    ],
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