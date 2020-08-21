<template>
    <section>
        <h4>Última atualização em {{ lastUpdatedDate }}</h4>
        <div class="container">
            <PieChart class="container-item"/>
            <LineChart class="container-item"/>
            <LogarithmicLineChart class="container-item"/>
        </div>
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
    @media (min-width: 500px) {
        .container {
            flex: 1;
            display: flex;
            flex-flow: wrap;
            justify-content: flex-start;
        }

        .container-item{
            padding-bottom: 2rem;
            flex-basis: 50%;
        }
    }

    @media (max-width: 499px) {
        section {
            text-align: center;
        }
    }
</style>
