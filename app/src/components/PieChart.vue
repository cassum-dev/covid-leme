<script>
    import { Pie } from "vue-chartjs"
    import  { getPieCovidData }  from "../services.js"

    export default {
        extends: Pie,
        data () {
            return {
                chartdata: {
                    labels: [
                        'Casos ativos',
                        'Casos recuperados',
                        'Óbitos'
                    ],
                    datasets: [
                        {
                            label: 'Covid Leme',
                            backgroundColor: ['#ef4b3f', '#00a85a', '#606062'],
                            data: [
                                getPieCovidData('active_cases'),
                                getPieCovidData('total_recovered'),
                                getPieCovidData('total_deaths')
                            ]
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