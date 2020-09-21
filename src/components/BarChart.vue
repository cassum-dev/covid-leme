<script>
import { Bar } from 'vue-chartjs';
import { getLastCovidData } from "../services.js";

export default {
    extends: Bar,
    data () {
        return {
            chartdata: {
                labels: [''],
                datasets: [
                    {
                        label: 'Novos casos confirmados',
                        borderColor: '#e46e1b',
                        backgroundColor: '#e46e1b',
                        data: [getLastCovidData("new_confirmed")]
                    },
                    {
                        label: 'Novos casos suspeitos',
                        borderColor: '#ffc107',
                        backgroundColor: '#ffc107',
                        data: [getLastCovidData("new_suspect")]
                    },
                    {
                        label: 'Novos casos recuperados',
                        borderColor: '#00a85a',
                        backgroundColor: '#00a85a',
                        data: [getLastCovidData("new_recovered")]
                    },
                    {
                        label: 'Novos óbitos',
                        borderColor: '#606062',
                        backgroundColor: '#606062',
                        data: [getLastCovidData("new_deaths")]
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
</script>
