<template>
    <section>
        <div class="card">
            <h4>Última atualização em {{ lastUpdatedDate }}</h4>
        </div>
        <div class="grid">
            <div class="card">
                <h3>Distribuição dos casos confirmados de covid hoje</h3>
                <div class="content">
                    <PieChart/>
                </div>
            </div>
            <div class="card">
                <h3>Todos os gráficos</h3>
                <div class="content">
                    <b-tabs justified lazy>
                        <b-tab title="Casos totais" active>
                            <LineChart/>
                        </b-tab>
                        <b-tab title="Curva logarítimica">
                            <LogarithmicLineChart/>
                        </b-tab>
                    </b-tabs>
                </div>
            </div>
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
        .card {
            background-color: #fff;
            border-radius: 1rem;
            margin-top: 2rem;
            padding: 0.8rem;
            box-shadow: 0 2px 4px rgba(30, 60, 90, 0.1);
            flex-basis: 49%;
            height: fit-content;
        }

        .grid {
            flex: 1;
            display: flex;
            flex-flow: wrap;
            justify-content: space-between;
        }
    }

    @media (max-width: 499px) {
        section {
            text-align: center;
        }

        .card {
            background-color: #fff;
            /* border-radius: 1rem; */
            margin-top: 1rem;
            padding: 0.5rem;
            box-shadow: 0 2px 4px rgba(30, 60, 90, 0.1);
            flex-basis: 49%;
            height: fit-content;
        }
    }
</style>
