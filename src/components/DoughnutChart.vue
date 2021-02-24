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
                    maintainAspectRatio: false,
                    tooltips: {
                        callbacks: {
                            label: function(t, d) {
                                let label = d.labels[t.index] + ': ' + d.datasets[0].data[t.index];

                                return label + '%';
                            }
                        }
                    },
                    plugins: {
                        datalabels: {
                            color: '#fff',
                            display: (context) => {
                                return context.dataset.data[context.dataIndex] !== 0
                                    ? 'auto'
                                    : false;
                            },
                            formatter: (value) => {
                                return value + '%';
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