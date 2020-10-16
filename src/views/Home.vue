<template>
    <section>
        <b-card>
            <h4>Você está vendo dados de {{ firstDate }} até {{ lastUpdatedDate }}</h4>
            <p></p>
            <div class="row">
                <div class="col-12 col-md-2">
                    <h5>Filtrar data final</h5>
                </div>
                <div class="col-12 col-md">
                    <input type="range" class="form-control-range"
                        :min="0"
                        :max="lastDateIndex"
                        v-model="timeRange"
                        @change="reloadCharts()"
                    >
                </div>
            </div>
        </b-card>
        <b-card-group columns>
            <b-card>
                <h3>Distribuição dos casos confirmados de covid hoje</h3>
                <div class="content">
                    <PieChart
                        :key="chartKey"
                        :labels="['Casos ativos', 'Casos recuperados', 'Óbitos']"
                        :colors="['#ec3237', '#00a85a', '#606062']"
                        :data="[
                            callGetLastCovidData('active_cases'),
                            callGetLastCovidData('total_recovered'),
                            callGetLastCovidData('total_deaths')
                        ]"
                    />
                    <a class="chart-info" @click="showCasesDistributionInfo
                        ? showCasesDistributionInfo = false
                        : showCasesDistributionInfo = true
                    ">
                        Tem alguma dúvida sobre esse gráfico?
                    </a>
                    <p/>
                    <div v-show="showCasesDistributionInfo">
                        <h5>O que esse gráfico representa ?</h5>
                        O gráfico de <b>Distribuição dos casos confirmados de covid hoje</b> é um gráfico de pizza tradicional, que exibe a relação dos casos de Covid-19 totais subdividos nas seções de "Casos confirmados", "Casos ativos" e "Óbitos".
                        <p/>
                        <h5>Como ler esse gráfico ?</h5>
                        Em um gráfico de pizza a leitura se dá pela comparação entre o tamanho de suas seções (fatias), providenciando uma visão clara sobre a situação clínica da população que contraiu Covid-19 na cidade de Leme-SP.
                    </div>
                </div>
            </b-card>

            <b-card>
                <h3>Casos confirmados hoje</h3>
                <div class="content">
                    <BarChart
                        :key="chartKey"
                        :chart-data="callBuildChartData({
                            chartLabels: [''],
                            dataLabels: [
                                'Novos casos confirmados',
                                'Novos casos suspeitos',
                                'Novos casos recuperados',
                                'Novos óbitos'
                            ],
                            colors: [
                                '#e46e1b',
                                '#ffc107',
                                '#00a85a',
                                '#606062'
                            ],
                            chartData: [
                                callGetLastCovidData('new_confirmed'),
                                callGetLastCovidData('new_suspect'),
                                callGetLastCovidData('new_recovered'),
                                callGetLastCovidData('new_deaths')
                            ],
                        })"
                    />
                    <a class="chart-info" @click="showNewCasesInfo
                        ? showNewCasesInfo = false
                        : showNewCasesInfo = true
                    ">
                        Tem alguma dúvida sobre esse gráfico?
                    </a>
                    <p/>
                    <div v-show="showNewCasesInfo">
                        <h5>O que esse gráfico representa ?</h5>
                        O gráfico de <b>Casos confirmados hoje</b> é um gráfico de barras clássico, que exibe os novos casos confirmados, trazendo sempre as últimas informações sobre o Covid-19.
                        <p/>
                        <h5>Como ler esse gráfico ?</h5>
                        Em um gráfico de barras a leitura se dá pela visualização da altura de cada barra e a subsequente comparação de determinada barra com as demais presentes, tal gráfico possibilita uma informação rápida e prática das ultimas confirmações de casos de Covid-19 em Leme-SP.
                    </div>
                </div>
            </b-card>

            <b-card>
                <h3>Óbitos confirmados</h3>
                <div class="content">
                    <BarChart
                        :key="chartKey"
                        :chart-data="callBuildChartData({
                            chartLabels: callGetMobileAverageDates(7),
                            dataLabels: [
                                'Óbitos confirmados',
                                'Estimativas para os próximos dias'
                            ],
                            colors: [
                                '#606062',
                                '#ec3237',
                            ],
                            chartData: [
                                callGetCovidData('total_deaths'),
                                callGetMobileAverage('total_deaths', 7),
                            ],
                            useXAxis: true
                        })"
                    />
                    <a class="chart-info" @click="showTotalDeathsInfo
                        ? showTotalDeathsInfo = false
                        : showTotalDeathsInfo = true
                    ">
                        Tem alguma dúvida sobre esse gráfico?
                    </a>
                    <p/>
                    <div v-show="showTotalDeathsInfo">
                        <h5>O que esse gráfico representa ?</h5>
                        O gráfico de <b>Óbitos confirmados</b> é um gráfico de barras clássico, que exibe os óbitos confirmados para Covid-19 por dia.
                        <p/>
                        <h5>Como ler esse gráfico ?</h5>
                        Em um gráfico de barras a leitura se dá pela visualização da altura de cada barra e a subsequente comparação de determinada barra com as demais presentes, tal gráfico possibilita uma informação rápida e prática dos de casos óbito por Covid-19 em Leme-SP, assim como exibe uma estimativa de mortes para os próximos sete dias.
                    </div>
                </div>
            </b-card>

            <b-card>
                <h3>Todos os gráficos</h3>
                <div class="content">
                    <b-tabs justified lazy>
                        <b-tab title="Casos totais" active>
                            <LineChart
                                :key="chartKey"
                                :chart-data="callBuildChartData({
                                    chartLabels: callGetCovidData('date'),
                                    dataLabels: [
                                        'Casos confirmados',
                                        'Casos ativos',
                                        'Casos suspeitos',
                                        'Casos recuperados',
                                        'Óbitos',
                                    ],
                                    colors: [
                                        '#e46e1b',
                                        '#ec3237',
                                        '#ffc107',
                                        '#00a85a',
                                        '#606062',
                                    ],
                                    chartData: [
                                        callGetCovidData('total_confirmed'),
                                        callGetCovidData('active_cases'),
                                        callGetCovidData('total_suspect'),
                                        callGetCovidData('total_recovered'),
                                        callGetCovidData('total_deaths'),
                                    ],
                                    fill: false,
                                    useXAxis: true,
                                })"
                            />
                            <a class="chart-info" @click="showTotalCasesInfo
                                ? showTotalCasesInfo = false
                                : showTotalCasesInfo = true
                            ">
                                Tem alguma dúvida sobre esse gráfico?
                            </a>
                            <p/>
                            <div v-show="showTotalCasesInfo">
                                <h5>O que esse gráfico representa ?</h5>
                                O gráfico de <b>Casos Totais</b> é um gráfico de linhas tradicional, que exibe o crescimento das diferentes situações dos casos de Covid-19 a partir de dados diários.
                                <p/>
                                <h5>Como ler esse gráfico ?</h5>
                                Em um gráfico de linhas a leitura se dá por meio da visualização dos pontos do mesmo, com os pontos representando os casos de determinado dia, tais dados podem ser analisados com foco tanto no curto quanto a longo prazo, providenciando assim uma visão do crescimento dos casos no município de Leme.
                            </div>
                        </b-tab>
                        <b-tab title="Curva logarítmica">
                            <LogarithmicLineChart
                                :key="chartKey"
                                :chart-data="callBuildChartData({
                                    chartLabels: callGetCovidData('date'),
                                    dataLabels: [
                                        'Casos confirmados',
                                        'Casos ativos',
                                        'Casos suspeitos',
                                        'Casos recuperados',
                                        'Óbitos',
                                    ],
                                    colors: [
                                        '#e46e1b',
                                        '#ec3237',
                                        '#ffc107',
                                        '#00a85a',
                                        '#606062',
                                    ],
                                    chartData: [
                                        callGetCovidData('total_confirmed'),
                                        callGetCovidData('active_cases'),
                                        callGetCovidData('total_suspect'),
                                        callGetCovidData('total_recovered'),
                                        callGetCovidData('total_deaths'),
                                    ],
                                    fill: false,
                                    useXAxis: true,
                                })"
                            />
                            <a class="chart-info" @click="showLogarithmicInfo
                                ? showLogarithmicInfo = false
                                : showLogarithmicInfo = true
                            ">
                                Tem alguma dúvida sobre esse gráfico ?
                            </a>
                            <p/>
                            <div v-show="showLogarithmicInfo">
                                <h5>O que esse gráfico representa ?</h5> O gráfico de <b>Curva Logarítmica</b> é um gráfico de linhas, que visa exibir a taxa de contágio pelo Covid-19 a médio e longo prazo a partir de dados diários.
                                <p/>
                                <h5>Como ler esse gráfico ?</h5>
                                Em um gráfico logarítmico os dados devem ser lidos como um todo, observando-se o comportamento das curvas do mesmo, sendo que uma curva mais plana representa uma menor taxa de contaminação diária durante certo prazo, enquanto picos e curvas acentuadas demonstram uma maior taxa de contaminação, providenciado assim uma visão abrangente de como o município de Leme lidou e vem lidando com a contenção da pandemia.
                            </div>
                        </b-tab>
                        <b-tab title="Casos entre sexos">
                            <PieChart :key="chartKey"
                                :labels="['Masculino', 'Feminino']"
                                :colors="['#0dc9da', '#f466ea']"
                                :data="[
                                    callGetLastCovidData('male', true),
                                    callGetLastCovidData('female', true)
                                ]"
                            />
                            <a class="chart-info" @click="showCasesBySexInfo
                                ? showCasesBySexInfo = false
                                : showCasesBySexInfo = true
                            ">
                                Tem alguma dúvida sobre esse gráfico?
                            </a>
                            <p/>
                            <div v-show="showCasesBySexInfo">
                                <h5>O que esse gráfico representa ?</h5>
                                O gráfico de <b>Casos entre sexos</b> é um gráfico de pizza tradicional, que exibe a relação dos casos de Covid-19 ocorridos entre homens e mulheres.
                                <p/>
                                <h5>Como ler esse gráfico ?</h5>
                                Em um gráfico de pizza a leitura se dá pela comparação entre o tamanho de suas seções (fatias), providenciando uma visão clara sobre a vunerabilidade e a propensão de contaminação por cada sexo.
                                <p>
                                <h5>Observações</h5>
                                A classificação de "sexo" de tal gráfico leva em consideração apenas o sexo biólogico dos afetados, seguindo o padrão de divulgação da prefeitura de Leme-SP e não englobando assim gênero ou orientação sexual.
                            </div>
                        </b-tab>
                    </b-tabs>
                </div>
            </b-card>
        </b-card-group>
    </section>
</template>

<script>
    import CovidData from '../datasources/covid.json';
    import PieChart from "../components/PieChart";
    import LineChart from "../components/LineChart";
    import LogarithmicLineChart from "../components/LogarithmicLineChart";
    import BarChart from "../components/BarChart";
    import { formatDates,
        getLastCovidData,
        getCovidData,
        getMobileAverage,
        getMobileAverageDates,
        buildChartData } from "../services.js";

    export default {
        name: "Home",
        data () {
            return {
                showCasesDistributionInfo: false,
                showNewCasesInfo: false,
                showTotalCasesInfo: false,
                showLogarithmicInfo: false,
                showCasesBySexInfo: false,
                showTotalDeathsInfo: false,
                timeRange: 0,
                chartKey: 0,
            }
        },
        methods: {
            callBuildChartData: function({
                chartLabels,
                dataLabels,
                colors,
                chartData,
                timeRange = this.timeRange,
                useXAxis,
                fill,
            }= {}) {
                return buildChartData(chartLabels, dataLabels, colors, chartData, timeRange, useXAxis, fill)
            },

            callGetCovidData: function(field) {
                if (field == 'date') {
                    return formatDates(getCovidData(field, this.timeRange))
                }

                return getCovidData(field, this.timeRange)
            },

            callGetLastCovidData: function(field, casesBySex) {
                return getLastCovidData(field, this.timeRange, casesBySex)
            },

            callGetMobileAverage: function(field, days) {
                return getMobileAverage(field, days, this.timeRange);
            },

            callGetMobileAverageDates: function(days) {
                return getMobileAverageDates(days, this.timeRange)
            },

            reloadCharts: function() {
                // Vue.js reloads the component props every time the key change
                // we use it to reload all charts props with new values
                return this.chartKey += 1
            }
        },
        computed: {
            firstDate: function() {
                let firstDay = CovidData[0];

                return formatDates(firstDay.date);
            },

            lastUpdatedDate: function() {
                let lastDay = this.timeRange > 0
                        ? CovidData[this.timeRange - 1]
                        : CovidData[CovidData.length - 1]

                return formatDates(lastDay.date);
            },

            lastDateIndex: function() {
                return CovidData.length;
            },
        },
        components: {
            LineChart,
            LogarithmicLineChart,
            PieChart,
            BarChart,
        }
    }
</script>

<style scoped>
    .chart-info {
        cursor: pointer;
    }

    .card {
        box-shadow: 0 2px 4px rgba(30, 60, 90, 0.1);
        border: none;
    }

    .card-columns {
        column-count: 2;
    }

    @media (min-width: 480px) {
        .card {
            border-radius: 1rem;
            margin-top: 1.5rem;
        }
    }

    @media (max-width: 480px) {
        section {
            text-align: center;
        }

        .card {
            margin-top: 1rem;
        }

        .card-columns {
            column-count: 1;
        }
    }
</style>
