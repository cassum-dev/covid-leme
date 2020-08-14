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
                        backgroundColor: 'transparent',
                        data: getData("total_confirmed")
                    },
                    {
                        label: 'Casos ativos',
                        borderColor: '#ef4b3f',
                        backgroundColor: 'transparent',
                        data: getData("active_cases")
                    },
                    {
                        label: 'Casos suspeitos',
                        borderColor: '#ffc107',
                        backgroundColor: 'transparent',
                        data: getData("total_suspect")
                    },
                    {
                        label: 'Casos recuperados',
                        borderColor: '#00a85a',
                        backgroundColor: 'transparent',
                        data: getData("total_recovered")
                    },
                    {
                        label: 'Óbitos',
                        borderColor: '#606062',
                        backgroundColor: 'transparent',
                        data: getData("total_deaths")
                    }
                ]
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

function getData(field) {
    let results = [];

    CovidData.forEach(element => {
        results.push(element[field])
    });

    return results;
}
</script>
