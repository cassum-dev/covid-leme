<script>
    import { Pie } from "vue-chartjs"

    export default {
        extends: Pie,
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
                    maintainAspectRatio: false,
                    plugins: {
                        datalabels: {
                            color: '#fff',
                            display: (context) => {
                                return context.dataset.data[context.dataIndex] !== 0
                                    ? 'auto'
                                    : false;
                            },
                            font: {
                                lineHeight: 0.75,
                                size: 11,
                                weight: 'bold'
                            },
                            offset: 0,
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