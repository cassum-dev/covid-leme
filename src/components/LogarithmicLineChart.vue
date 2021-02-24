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
                maintainAspectRatio: false,
                scales: {
                    xAxes: [{
                        display: true,
                    }],
                    yAxes: [{
                        display: true,
                        type: 'logarithmic',
                        ticks: {
                            min: 0,
                            max: 100000,
                            autoSkip: false,
                            callback: function (value) {
                                if (value === 100000) return "100K";
                                if (value === 10000) return "10K";
                                if (value === 1000) return "1K";
                                if (value === 100) return "100";
                                if (value === 10) return "10";
                                if (value === 0) return "0";

                                return null;
                            }
                        }
                    }]
                },
                plugins: {
                    datalabels: {
                        display: false
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
