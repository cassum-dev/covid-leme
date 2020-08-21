<script>
import CovidData from '../datasources/covid.json';
import { Line } from 'vue-chartjs';

export default {
    extends: Line,
    data () {
        return {
            chartdata: {
                labels: getData("date"),
                datasets: [
                    {
                        label: 'Casos confirmados',
                        borderColor: '#ec3237',
                        backgroundColor: '#ec3237',
                        fill:false,
                        data: getData("total_confirmed")
                    },
                    {
                        label: 'Casos ativos',
                        borderColor: '#e46e1b',
                        backgroundColor: '#e46e1b',
                        fill:false,
                        data: getData("active_cases")
                    },
                    {
                        label: 'Casos suspeitos',
                        borderColor: '#ffc107',
                        backgroundColor: '#ffc107',
                        fill:false,
                        data: getData("total_suspect")
                    },
                    {
                        label: 'Casos recuperados',
                        borderColor: '#00a85a',
                        backgroundColor: '#00a85a',
                        fill:false,
                        data: getData("total_recovered")
                    },
                    {
                        label: 'Óbitos',
                        borderColor: '#606062',
                        backgroundColor: '#606062',
                        fill:false,
                        data: getData("total_deaths")
                    }
                ]
            },
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
                }
            }
        }
    },
    mounted () {
        this.renderChart(this.chartdata, this.options)
    }
}

function getData(field) {
    let results = [];

    CovidData.forEach(element => {
        results.push(element[field])
    });

    return results;
}
</script>
