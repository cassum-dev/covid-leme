<template>
    <section>
        <b-card>
            <h4>Você está vendo dados de {{ firstUpdatedDate }} até {{ lastUpdatedDate }}</h4>
            <p></p>
            <div class="row">
                <div class="col-12 col-md-2">
                    <h5>Filtrar datas</h5>
                </div>
                <div class="col-12 col-md">
                    <VueSlider
                        :lazy="true"
                        :min="0"
                        :max="lastDateIndex"
                        :minRange="1"
                        :tooltip="'none'"
                        v-model="timeRange"
                        @drag-end="reloadCharts"
                    />
                </div>
            </div>
        </b-card>
        <b-card-group columns>
            <b-card>
                <h3>Distribuição dos casos confirmados de Covid</h3>
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
                <h3>Últimos casos informados</h3>
                <div class="content">
                    <b-table-lite :items="newCasesTableItems" :responsive="true" thead-class="d-none"/>
                    <a class="chart-info" @click="showNewCasesInfo
                        ? showNewCasesInfo = false
                        : showNewCasesInfo = true
                    ">
                        Tem alguma dúvida sobre essa tabela?
                    </a>
                    <p/>
                    <div v-show="showNewCasesInfo">
                        <h5>O que esse tabela representa ?</h5>
                        A tabela de <b>Casos confirmados hoje</b> exibe os novos casos confirmados, trazendo sempre as últimas informações sobre o Covid-19.
                        <p/>
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
                                    callGetLastCovidData('male', 'covid_cases_by_sex'),
                                    callGetLastCovidData('female', 'covid_cases_by_sex')
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

            <b-card v-if="true">
                <h3>Vacinados</h3>
                <h6 class="note">Atualizado a cada nova liberação de dados pela prefeitura de Leme-SP</h6>
                <div class="content">
                    <DoughnutChart
                        :key="chartKey"
                        :labels="['Pessoas vacinadas', 'Pessoas não vacinadas']"
                        :colors="['#17a2b8', '#606062']"
                        :data="vaccinatedData"
                    />
                    <a class="chart-info" @click="showVaccinatedInfo
                        ? showVaccinatedInfo = false
                        : showVaccinatedInfo = true
                    ">
                        Tem alguma dúvida sobre esse gráfico?
                    </a>
                    <p/>
                    <div v-show="showVaccinatedInfo">
                        <h5>O que esse gráfico representa ?</h5>
                        O gráfico de <b>Vacinados</b> é um gráfico de rosquinha tradicional, que exibe a quantidade de pessoas vacinadas contra Covid-19 em relação a população total de Leme SP.
                        <p/>
                        <h5>Como ler esse gráfico ?</h5>
                        Em um gráfico de rosquinha a leitura se dá pela comparação entre o tamanho de suas seções (fatias) em relação ao todo, providenciando uma visão clara sobre a situação clínica da população que já foi vacinada contra Covid-19 na cidade de Leme-SP.
                        <p/>
                        <h5>Por que esse gráfico não é atualizado diariamente ?</h5>
                        O gráfico de <b>Vacinados</b> não é atualizado junto com os demais dados por conta da política de divulgação de dados pela secretaria de comunicação de Leme-SP, essa que por sua vez não os libera diariamente e nem possui uma recorrência de liberação pré definida para tais dados.
                        <p/>
                        <h5>Observações</h5>
                        A população lemense é de 104.346 habitantes segundo o <a href="https://cidades.ibge.gov.br/brasil/sp/leme/panorama" target="_blank">IBGE 2020</a>
                    </div>
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
    import DoughnutChart from "../components/DoughnutChart";

    import VueSlider from "vue-slider-component"
    import 'vue-slider-component/theme/default.css'

    import { formatDates,
        getLastCovidData,
        getCovidData,
        getMobileAverage,
        getMobileAverageDates,
        buildChartData,
        roundDecimalPlaces } from "../services.js";

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
                showVaccinatedInfo: false,
                timeRange: [0, CovidData.length],
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

            callGetLastCovidData: function(field, dataSource) {
                return getLastCovidData(field, this.timeRange, dataSource)
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
            },
        },
        computed: {
            firstUpdatedDate: function() {
                let firstDay = CovidData[this.timeRange[0]]

                return formatDates(firstDay.date);
            },

            lastUpdatedDate: function() {
                let lastDay = CovidData[this.timeRange[1] - 1];

                return formatDates(lastDay.date);
            },

            lastDateIndex: function() {
                return CovidData.length;
            },

            vaccinatedData: function() {
                // The total population is referent to 2020 IBGE's data
                const population = 104346;

                let vaccinated = this.callGetLastCovidData('vaccinated', 'vaccinated_data');

                let vaccinatedPercentage = (vaccinated / (population - vaccinated)) * 100,
                    nonVaccinatedPercentage = (100 - vaccinatedPercentage);

                return [
                    roundDecimalPlaces(vaccinatedPercentage),
                    roundDecimalPlaces(nonVaccinatedPercentage)
                ]
            },

            newCasesTableItems: function() {
                return [
                    {
                        label: 'Novos casos confirmados',
                        data: this.callGetLastCovidData('new_confirmed')
                    },
                    {
                        label: 'Novos casos suspeitos',
                        data: this.callGetLastCovidData('new_suspect')
                    },
                    {
                        label: 'Novos casos recuperados',
                        data: this.callGetLastCovidData('new_recovered')
                    },
                    {
                        label: 'Novos óbitos',
                        data: this.callGetLastCovidData('new_deaths')
                    }
                ]
            },
        },
        components: {
            LineChart,
            LogarithmicLineChart,
            PieChart,
            BarChart,
            VueSlider,
            DoughnutChart,
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

    .note {
        color: #696969;
        font-size: 0.8rem;
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
