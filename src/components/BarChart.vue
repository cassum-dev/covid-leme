<script>
import { Bar } from 'vue-chartjs';

export default {
    extends: Bar,
    props: ['chartLabels', 'dataLabels', 'colors', 'data', 'useXAxis'],
    data () {
        return {
            chartdata: {
                labels: this.chartLabels,
                datasets: this.buildDatasets(),
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    methods: {
        buildDatasets: function() {
            var datasets = [];

            this.dataLabels.forEach((element, key) => {
                datasets.push(
                    {
                        label: this.dataLabels[key],
                        borderColor: this.colors[key],
                        backgroundColor: this.colors[key],
                        data: this.useXAxis
                            ? this.data[key]
                            : [this.data[key]],
                    },
                );
            });

            return datasets;
        }
    },
    mounted () {
        this.renderChart(this.chartdata, this.options)
    }
}
</script>

