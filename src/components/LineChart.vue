<script>
import CovidData from '../datasources/covid.json';
import { Line } from 'vue-chartjs';
import { formatDates } from "../services.js"

export default {
    extends: Line,
    data () {
        return {
            chartdata: {
                labels: formatDates(getData("date")),
                datasets: [
                    {
                        label: 'Casos confirmados',
                        borderColor: '#e46e1b',
                        backgroundColor: '#e46e1b',
                        fill:false,
                        data: getData("total_confirmed")
                    },
                    {
                        label: 'Casos ativos',
                        borderColor: '#ec3237',
                        backgroundColor: '#ec3237',
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
