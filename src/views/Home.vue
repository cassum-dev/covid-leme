<template>
    <section>
        <div class="card">
            <h4>Última atualização em {{ lastUpdatedDate }}</h4>
        </div>
        <div class="grid">
            <div class="card">
                <h3>Distribuição dos casos confirmados de covid hoje</h3>
                <div class="content">
                    <PieChart
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
            </div>

            <div class="card">
                <h3>Casos confirmados hoje</h3>
                <div class="content">
                    <BarChart
                        :chart-labels="['']"
                        :data-labels="[
                            'Novos casos confirmados',
                            'Novos casos suspeitos',
                            'Novos casos recuperados',
                            'Novos óbitos'
                        ]"
                        :colors="[
                            '#e46e1b',
                            '#ffc107',
                            '#00a85a',
                            '#606062'
                        ]"
                        :data="[
                            callGetLastCovidData('new_confirmed'),
                            callGetLastCovidData('new_suspect'),
                            callGetLastCovidData('new_recovered'),
                            callGetLastCovidData('new_deaths')
                        ]"
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
            </div>

            <div class="card">
                <h3>Óbitos confirmados</h3>
                <div class="content">
                    <BarChart
                        :chart-labels="callGetMobileAverageDates(7)"
                        :data-labels="[
                            'Óbitos confirmados',
                            'Estimativas para os próximos dias'
                        ]"
                        :colors="[
                            '#606062',
                            '#ec3237'
                        ]"
                        :data="[
                            callGetCovidData('total_deaths'),
                            callGetMobileAverage('total_deaths', 7),
                        ]"
                        :use-x-axis="true"
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
            </div>

            <div class="card">
                <h3>Todos os gráficos</h3>
                <div class="content">
                    <b-tabs justified lazy>
                        <b-tab title="Casos totais" active>
                            <LineChart/>
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
                            <LogarithmicLineChart/>
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
                            <PieChart
                                :labels="['Masculino', 'Feminino']"
                                :colors="['#0dc9da', '#f466ea']"
                                :data="[
                                    callGetCovidCasesBySex('male'),
                                    callGetCovidCasesBySex('female')
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
            </div>
        </div>
    </section>
</template>

<script>
    import CovidData from '../datasources/covid.json';
    import PieChart from "../components/PieChart";
    import LineChart from "../components/LineChart";
    import LogarithmicLineChart from "../components/LogarithmicLineChart";
    import BarChart from "../components/BarChart";
    import { formatDates, getLastCovidData, getCovidCasesBySex, getCovidData, getMobileAverage, getMobileAverageDates } from "../services.js";

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
            }
        },
        methods: {
            callGetCovidData: function(field) {
                if (field == 'date') {
                    return formatDates(getCovidData(field))
                }

                return getCovidData(field)
            },

            callGetLastCovidData: function(field) {
                return getLastCovidData(field)
            },

            callGetCovidCasesBySex: function(field) {
                return getCovidCasesBySex(field)
            },

            callGetMobileAverage: function(field, days) {
                return getMobileAverage(field, days);
            },

            callGetMobileAverageDates: function(days) {
                return getMobileAverageDates(days)
            }
        },
        computed: {
            lastUpdatedDate: function() {
                let lastDay = CovidData.find(element => element.is_last == true);

                return formatDates(lastDay.date);
            }
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
        background-color: #fff;
        box-shadow: 0 2px 4px rgba(30, 60, 90, 0.1);
        flex-basis: 49%;
        height: fit-content;
    }

    @media (min-width: 480px) {
        .card {
            border-radius: 1rem;
            margin-top: 2rem;
            padding: 0.8rem;
        }

        .grid {
            flex: 1;
            display: flex;
            flex-flow: wrap;
            justify-content: space-between;
        }
    }

    @media (max-width: 480px) {
        section {
            text-align: center;
        }

        .card {
            margin-top: 1rem;
            padding: 0.5rem;
        }
    }
</style>
