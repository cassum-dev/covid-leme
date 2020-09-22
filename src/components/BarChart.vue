<script>
import { Bar } from 'vue-chartjs';

export default {
    extends: Bar,
    props: ['labels', 'colors', 'data'],
    data () {
        return {
            chartdata: {
                labels: [''],
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

            this.labels.forEach((element, key) => {
                datasets.push(
                    {
                        label: this.labels[key],
                        borderColor: this.colors[key],
                        backgroundColor: this.colors[key],
                        data: [this.data[key]],
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
