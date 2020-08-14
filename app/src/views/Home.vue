<template>
    <section>
        <h1>Covid Leme</h1>
        <h4>Última atualização em {{ lastUpdatedDate }}</h4>
        <PieChart/>
        <LineChart/>
        <LogarithmicLineChart/>
    </section>
</template>

<script>
    import CovidData from '../datasources/covid.json';
    import PieChart from "../components/PieChart";
    import LineChart from "../components/LineChart";
    import LogarithmicLineChart from "../components/LogarithmicLineChart";

    export default {
        name: "Home",
        computed: {
            lastUpdatedDate: function() {
                let lastDay = CovidData.find(element => element.is_last == true);

                return lastDay.date;
            }
        },
        components: {
            LineChart,
            LogarithmicLineChart,
            PieChart
        }
    }
</script>

<style scoped>

</style>
