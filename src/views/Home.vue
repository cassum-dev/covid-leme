<template>
    <section>
        <b-card>
            <div class="row">
                <div class="col-12">
                    <h5 class="date-filter-title">Filtrar datas </h5>
                    <span class="note">Você está vendo dados de {{ firstUpdatedDate }} até {{ lastUpdatedDate }}</span>
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
                <hr>
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
                    <span v-b-toggle.collapseCasesDistributionInfo>
                        <hr>
                        <h6>Tem alguma dúvida sobre esse gráfico?</h6>

                        <b-collapse id="collapseCasesDistributionInfo">
                            <h5>O que esse gráfico representa ?</h5>
                            <p>
                                O gráfico de <b>Distribuição dos casos confirmados de covid hoje</b> é um gráfico de pizza tradicional, que exibe a relação dos casos de Covid-19 totais subdividos nas seções de "Casos confirmados", "Casos ativos" e "Óbitos".
                            </p>
                            <h5>Como ler esse gráfico ?</h5>
                            <p>
                                Em um gráfico de pizza a leitura se dá pela comparação entre o tamanho de suas seções (fatias), providenciando uma visão clara sobre a situação clínica da população que contraiu Covid-19 na cidade
                            de Leme-SP.
                            </p>
                        </b-collapse>
                    </span>
                </div>
            </b-card>

            <b-card>
                <h3>Últimos casos informados</h3>
                <div class="content">
                    <b-table-lite :responsive="true" thead-class="d-none" :items="[
                        {
                            label: 'Novos casos confirmados',
                            data: callGetLastCovidData('new_confirmed')
                        },
                        {
                            label: 'Novos casos suspeitos',
                            data: callGetLastCovidData('new_suspect')
                        },
                        {
                            label: 'Novos casos recuperados',
                            data: callGetLastCovidData('new_recovered')
                        },
                        {
                            label: 'Novos óbitos',
                            data: callGetLastCovidData('new_deaths')
                        }
                    ]"/>
                    <span v-b-toggle.collapseNewCasesInfo>
                        <hr>
                        <h6>Tem alguma dúvida sobre essa tabela?</h6>

                        <b-collapse id="collapseNewCasesInfo">
                            <h5>O que esse tabela representa ?</h5>
                            <p>
                                A tabela de <b>Casos confirmados hoje</b> exibe os novos casos confirmados, trazendo sempre as últimas informações sobre o Covid-19.
                            </p>
                        </b-collapse>
                    </span>
                </div>
            </b-card>

            <b-card>
                <h3>Óbitos confirmados</h3>
                <hr>
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
                    <span v-b-toggle.collapseTotalDeathsInfo>
                        <hr>
                        <h6>Tem alguma dúvida sobre esse gráfico?</h6>

                        <b-collapse id="collapseTotalDeathsInfo">
                            <h5>O que esse gráfico representa ?</h5>
                            <p>
                                O gráfico de <b>Óbitos confirmados</b> é um gráfico de barras clássico, que exibe os óbitos confirmados para Covid-19 por dia.
                            </p>
                            <h5>Como ler esse gráfico ?</h5>
                            <p>
                                Em um gráfico de barras a leitura se dá pela visualização da altura de cada barra e a subsequente comparação de determinada barra com as demais presentes, tal gráfico possibilita uma informação rápida e prática dos de casos óbito por Covid-19 em Leme-SP, assim como exibe uma estimativa de mortes para os próximos sete dias.
                            </p>
                        </b-collapse>
                    </span>
                </div>
            </b-card>

            <b-card>
                <h3>Gráficos gerais</h3>
                <hr>
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
                            <span v-b-toggle.collapseTotalCasesInfo>
                                <hr>
                                <h6>Tem alguma dúvida sobre esse gráfico?</h6>

                                <b-collapse id="collapseTotalCasesInfo">
                                    <h5>O que esse gráfico representa ?</h5>
                                    <p>
                                        O gráfico de <b>Casos Totais</b> é um gráfico de linhas tradicional, que exibe o crescimento das diferentes situações dos casos de Covid-19 a partir de dados diários.
                                    </p>
                                    <h5>Como ler esse gráfico ?</h5>
                                    <p>
                                        Em um gráfico de linhas a leitura se dá por meio da visualização dos pontos do mesmo, com os pontos representando os casos de determinado dia, tais dados podem ser analisados com foco tanto no curto quanto a longo prazo, providenciando assim uma visão do crescimento dos casos no município de Leme.
                                    </p>
                                </b-collapse>
                            </span>
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
                            <span v-b-toggle.collapseLogarithmicInfo>
                                <hr>
                                <h6>Tem alguma dúvida sobre esse gráfico?</h6>

                                <b-collapse id="collapseLogarithmicInfo">
                                    <h5>O que esse gráfico representa ?</h5>
                                    <p>
                                        O gráfico de <b>Curva Logarítmica</b> é um gráfico de linhas, que visa exibir a taxa de contágio pelo Covid-19 a médio e longo prazo a partir de dados diários.
                                    </p>
                                    <h5>Como ler esse gráfico ?</h5>
                                    <p>
                                        Em um gráfico logarítmico os dados devem ser lidos como um todo, observando-se o comportamento das curvas do mesmo, sendo que uma curva mais plana representa uma menor taxa de contaminação diária durante certo prazo, enquanto picos e curvas acentuadas demonstram uma maior taxa de contaminação, providenciado assim uma visão abrangente de como o município de Leme lidou e vem lidando com a contenção da pandemia.
                                    </p>
                                </b-collapse>
                            </span>
                        </b-tab>
                    </b-tabs>
                </div>
            </b-card>

            <b-card>
                <h3>Distribuição de casos entre sexos</h3>
                <hr>
                <div class="content">
                    <PieChart :key="chartKey"
                        :labels="['Masculino', 'Feminino']"
                        :colors="['#0dc9da', '#f466ea']"
                        :data="[
                            callGetLastCovidData('male', 'covid_cases_by_sex'),
                            callGetLastCovidData('female', 'covid_cases_by_sex')
                        ]"
                    />
                    <span v-b-toggle.collapseCasesPerSexInfo>
                        <hr>
                        <h6>Tem alguma dúvida sobre esse gráfico?</h6>

                        <b-collapse id="collapseCasesPerSexInfo">
                            <h5>O que esse gráfico representa ?</h5>
                            <p>
                                O gráfico de <b>Distribuição de casos entre sexos</b> é um gráfico de pizza tradicional, que exibe a relação dos casos de Covid-19 ocorridos entre homens e mulheres.
                            </p>
                            <h5>Como ler esse gráfico ?</h5>
                            <p>
                                Em um gráfico de pizza a leitura se dá pela comparação entre o tamanho de suas seções (fatias), providenciando uma visão clara sobre a vunerabilidade e a propensão de contaminação por cada sexo.
                            </p>
                            <h5>Observações</h5>
                            <p>
                                A classificação de "sexo" de tal gráfico leva em consideração apenas o sexo biólogico dos afetados, seguindo o padrão de divulgação da prefeitura de Leme-SP e não englobando assim gênero ou orientação sexual.
                            </p>
                        </b-collapse>
                    </span>
                </div>
            </b-card>

            <b-card>
                <h3>Vacinados</h3>
                <hr>
                <h6 class="note">Atualizado a cada nova liberação de dados pela prefeitura de Leme-SP</h6>
                <div class="content">
                    <DoughnutChart
                        :key="chartKey"
                        :labels="['Pessoas vacinadas', 'Pessoas não vacinadas']"
                        :colors="['#17a2b8', '#606062']"
                        :data="vaccinatedData"
                    />
                    <span v-b-toggle.collapseVaccinatedInfo>
                        <hr>
                        <h6>Tem alguma dúvida sobre esse gráfico?</h6>

                        <b-collapse id="collapseVaccinatedInfo">
                            <h5>O que esse gráfico representa ?</h5>
                            <p>
                                O gráfico de <b>Vacinados</b> é um gráfico de rosquinha tradicional, que exibe a quantidade de pessoas vacinadas contra Covid-19 em relação a população total de Leme SP.
                            </p>
                            <h5>Como ler esse gráfico ?</h5>
                            <p>
                                Em um gráfico de rosquinha a leitura se dá pela comparação entre o tamanho de suas seções (fatias) em relação ao todo, providenciando uma visão clara sobre a situação clínica da população que já foi vacinada contra Covid-19 na cidade de Leme-SP.
                            </p>
                            <h5>Por que esse gráfico não é atualizado diariamente ?</h5>
                            <p>
                                O gráfico de <b>Vacinados</b> não é atualizado junto com os demais dados por conta da política de divulgação de dados pela secretaria de comunicação de Leme-SP, essa que por sua vez não os libera diariamente e nem possui uma recorrência de liberação pré definida para tais dados.
                            </p>
                            <h5>Observações</h5>
                            <p>
                                A população lemense é de 104.346 habitantes segundo o <a href="https://cidades.ibge.gov.br/brasil/sp/leme/panorama" target="_blank">IBGE 2020</a>
                            </p>
                        </b-collapse>
                    </span>
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

    .date-filter-title {
        display: inline;
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

        .date-filter-title {
            display: block;
        }
    }
</style>
