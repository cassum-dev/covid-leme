<template>
    <section>
        <div class="card">
            <h4>Última atualização em {{ callFormatDates(lastUpdatedDate) }}</h4>
        </div>
        <div class="grid">
            <div class="card">
                <h3>Distribuição dos casos confirmados de covid hoje</h3>
                <div class="content">
                    <PieChart
                        :labels="['Casos ativos', 'Casos recuperados', 'Óbitos']"
                        :colors="['#ec3237', '#00a85a', '#606062']"
                        :data="[
                            callGetPieCovidData('active_cases'),
                            callGetPieCovidData('total_recovered'),
                            callGetPieCovidData('total_deaths')
                        ]"
                    />
                </div>
            </div>
            <div class="card">
                <h3>Todos os gráficos</h3>
                <div class="content">
                    <b-tabs justified lazy>
                        <b-tab title="Casos totais" active>
                            <LineChart/>
                            <a class="chart-info" @click="showChartInfo(showInfo)">
                                Tem alguma dúvida sobre esse gráfico?
                            </a>
                            <p/>
                            <div v-show="showInfo">
                                <h5>O que esse gráfico representa ?</h5>
                                O gráfico de <b>Casos Totais</b> é um gráfico de linhas tradicional, que exibe o crescimento das diferentes situações dos casos de Covid-19 a partir de dados diários.
                                <p/>
                                <h5>Como ler esse gráfico ?</h5>
                                Em um gráfico de linhas a leitura se dá por meio da visualização dos pontos do mesmo, com os pontos representando os casos de determinado dia, tais dados podem ser analisados com foco tanto no curto quanto a longo prazo, providenciando assim uma visão do crescimento dos casos no município de Leme.
                            </div>
                        </b-tab>
                        <b-tab title="Curva logarítmica">
                            <LogarithmicLineChart/>
                            <a class="chart-info" @click="showChartInfo(showInfo)">
                                Tem alguma dúvida sobre esse gráfico ?
                            </a>
                            <p/>
                            <div v-show="showInfo">
                                <h5>O que esse gráfico representa ?</h5> O gráfico de <b>Curva Logarítmica</b> é um gráfico de linhas, que visa exibir a taxa de contágio pelo Covid-19 a médio e longo prazo a partir de dados diários.
                                <p/>
                                <h5>Como ler esse gráfico ?</h5>
                                Em um gráfico logarítmico os dados devem ser lidos como um todo, observando-se o comportamento das curvas do mesmo, sendo que uma curva mais plana representa uma menor taxa de contaminação diária durante certo prazo, enquanto picos e curvas acentuadas demonstram uma maior taxa de contaminação, providenciado assim uma visão abrangente de como o município de Leme lidou e vem lidando com a contenção da pandemia.
                            </div>
                        </b-tab>
                        <b-tab title="Casos entre sexos">
                            <PieChart
                                :labels="['Masculino', 'Feminino']"
                                :colors="['#0dc9da', '#f466ea']"
                                :data="[
                                    callGetCovidCasesBySex('male'),
                                    callGetCovidCasesBySex('female')
                                ]"
                            />
                            <a class="chart-info" @click="showChartInfo(showInfo)">
                                Tem alguma dúvida sobre esse gráfico?
                            </a>
                            <p/>
                            <div v-show="showInfo">
                                <h5>O que esse gráfico representa ?</h5>
                                O gráfico de <b>Casos entre sexos</b> é um
                                gráfico de pizza tradicional, que exibe a
                                relação dos casos de Covid-19 ocorridos entre
                                homens e mulheres.
                                <p/>
                                <h5>Como ler esse gráfico ?</h5>
                                Em um gráfico de pizza a leitura se dá pela
                                comparação entre o tamanho de suas seções (fatias), providenciando uma visão clara sobre
                                a vunerabilidade e a propensão de contaminação
                                por cada sexo.
                                <p>
                                <h5>Observações</h5>
                                A classificação de "sexo" de tal gráfico leva em
                                consideração apenas o sexo biólogico dos
                                afetados, seguindo o padrão de divulgação da
                                prefeitura de Leme-SP e não associando assim gênero ou orientação sexual.
                            </div>
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
    import { formatDates, getPieCovidData, getCovidCasesBySex } from "../services.js";

    export default {
        name: "Home",
        data () {
            return {
                showInfo: false
            }
        },
        methods: {
            showChartInfo: function(show) {
                if (show) {
                    return this.showInfo = false;
                }

                return this.showInfo = true;
            },

            callFormatDates: function(date) {
                return formatDates(date)
            },

            callGetPieCovidData: function(field) {
                return getPieCovidData(field)
            },

            callGetCovidCasesBySex: function(field) {
                return getCovidCasesBySex(field)
            }
        },
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
    .chart-info {
        cursor: pointer;
    }

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
