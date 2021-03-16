<template>
    <section>
        <b-card>
            <h4>Estágios do comércio</h4>
            <h6 class="note">Última mudança de estágio em {{ lastStatusChange }}</h6>
        </b-card>

        <b-card-group columns>
            <b-card class="emergency" :class="{'current-status' : cityStatus === 'emergency'}">
                <template #header v-if="cityStatus === 'emergency'">
                    <h6>Estágio atual</h6>
                </template>

                <h4>Estágio emergencial</h4>
                <p>
                    Fase de máxima restrição, aplicada apenas quando a disseminação e as mortes por Covid-19 estão descontroladas e atingindo niveis alarmantes.
                </p>
                <p>
                    Essa fase possui fortes indicadores de calamidade pública, elevando o risco para todas os membros da sociedade de um futuro colapso nos serviços de saúde público e privados, colapso esse que é iminente caso não haja o devido isolamento social.
                </p>
                <hr>
                <span v-b-toggle.collapseEmergencyInfo>
                    <b>O que pode abrir ?</b>

                    <b-collapse id="collapseEmergencyInfo">
                        <ul>
                            <li>Farmácias*</li>
                            <li>Mercados e lojas de bens essenciais*</li>
                            <li>Repartições públicas essenciais*</li>
                            <li>Serviços essenciais de assistência a população*</li>
                        </ul>

                        * - Hotários e lotação muito limitados
                    </b-collapse>
                </span>
            </b-card>

            <b-card class="red" :class="{'current-status' : cityStatus === 'red'}">
                <template #header v-if="cityStatus === 'red'">
                    <h6>Estágio atual</h6>
                </template>

                <h4>Alerta máximo</h4>
                <p>
                    Fase de alta contaminação e disssemnição da Covid-19, nessa fase só é permitido o funcionamento de serviços essenciais.
                </p>
                <hr>
                <span v-b-toggle.collapseRedInfo>
                    <b>O que pode abrir ?</b>

                    <b-collapse id="collapseRedInfo">
                        <ul>
                            <li>Farmácias</li>
                            <li>Mercados e lojas de conveniência</li>
                            <li>Repartições públicas</li>
                            <li>Serviços essenciais de assistência a população</li>
                        </ul>
                    </b-collapse>
                </span>
            </b-card>

            <b-card class="orange" :class="{'current-status' : cityStatus === 'orange'}">
                <template #header v-if="cityStatus === 'orange'">
                    <h6>Estágio atual</h6>
                </template>

                <h4>Controle</h4>
                <p>
                    Fase de atenção, com limitações a outros serviços que não os essenciais. Nessa fase ocorrem as primeiras liberações de setores, priorizando-os pela vunerabilidade social, econômica e empregaticia.
                </p>
                <hr>
                <span v-b-toggle.collapseOrangeInfo>
                    <b>O que pode abrir ?</b>

                    <b-collapse id="collapseOrangeInfo">
                        <ul>
                            <li>Mercados e lojas de conveniência</li>
                            <li>Repartições públicas</li>
                            <li>Serviços essenciais de assitência a população</li>
                            <li>Shoppings e galerias*</li>
                            <li>Comércio em geral*</li>
                            <li>Serviços gerais*</li>
                            <li>Lanchonetes e restaurantes*</li>
                            <li>Salões de beleza*</li>
                            <li>Academias*, sem aulas em grupo</li>
                            <li>Eventos e atividades culturais respeitando o distânciamento mínimo</li>
                        </ul>

                        * - Lotação máxima de 40%
                    </b-collapse>
                </span>
            </b-card>

            <b-card class="yellow" :class="{'current-status' : cityStatus === 'yellow'}">
                <template #header v-if="cityStatus === 'yellow'">
                    <h6>Estágio atual</h6>
                </template>

                <h4>Flexibilização</h4>
                <p>
                    Fase controlada, nessa fase inica-se de fato a flexibilização das atividades comerciais e de lazer, mas com algumas restrições quanto a aglomerações.
                </p>
                <hr>
                <span v-b-toggle.collapseYellowInfo>
                    <b>O que pode abrir ?</b>

                    <b-collapse id="collapseYellowInfo">
                        <ul>
                            <li>Mercados e lojas de conveniência</li>
                            <li>Repartições públicas</li>
                            <li>Serviços essenciais de assitência a população</li>
                            <li>Shoppings e galerias*</li>
                            <li>Comércio em geral*</li>
                            <li>Serviços gerais*</li>
                            <li>Lanchonetes e restaurantes*</li>
                            <li>Salões de beleza*</li>
                            <li>Academias*, sem aulas em grupo</li>
                            <li>Eventos e atividades culturais respeitando o distânciamento mínimo</li>
                            <li>Bares*</li>
                        </ul>

                        * - Lotação máxima de 40%
                    </b-collapse>
                </span>
            </b-card>

            <b-card class="green" :class="{'current-status' : cityStatus === 'green'}">
                <template #header v-if="cityStatus === 'green'">
                    <h6>Estágio atual</h6>

                </template>
                <h4>Abertura parcial</h4>
                <p>
                    Nessa fase os casos de Covid-19 está decaindo, nela as flexibizações iniciadas na fase amarela são intensificadas e eventos público com número reduzido de pessoas são permitidos.
                </p>
                <hr>
                <span v-b-toggle.collapseGreenInfo>
                    <b>O que pode abrir ?</b>

                    <b-collapse id="collapseGreenInfo">
                        <ul>
                            <li>Mercados e lojas de conveniência</li>
                            <li>Repartições públicas</li>
                            <li>Serviços essenciais de assitência a população</li>
                            <li>Shoppings e galerias*</li>
                            <li>Comércio em geral*</li>
                            <li>Serviços gerais*</li>
                            <li>Lanchonetes e restaurantes*</li>
                            <li>Salões de beleza*</li>
                            <li>Academias*, sem aulas em grupo</li>
                            <li>Eventos e atividades culturais respeitando o distânciamento mínimo</li>
                            <li>Bares*</li>
                        </ul>

                        * - Lotação máxima de 60%
                    </b-collapse>
                </span>
            </b-card>

            <b-card class="blue" :class="{'current-status' : cityStatus === 'blue'}">
                <template #header v-if="cityStatus === 'blue'">
                    <b>Estágio atual</b>
                </template>
                <h4>Normal controlado</h4>
                <p>
                    Fase definitiva da liberação de atividades, com protocolos e restrições brandas, nessa fase os casos de Covid-19 estão muito controlados e o planejamento público está apto para lidar com tais.
                </p>
                <hr>
                <span v-b-toggle.collapseBlueInfo>
                    <h6>O que pode abrir ?</h6>

                    <b-collapse id="collapseBlueInfo">
                        Todas as atividades comerciais e sociais funcionam Normalmente, seguindo apenas regulamentações básicas como o distanciamento mínimo e o uso de máscaras.
                    </b-collapse>
                </span>
            </b-card>
        </b-card-group>
    </section>
</template>

<script>
import { getLastCovidData, formatDates } from '../services.js';

export default {
    computed: {
        cityStatus: () => {
            return getLastCovidData('status', null, 'covid_city_status');
        },

        lastStatusChange: () => {
            let date = getLastCovidData('date', null, 'covid_city_status');

            return formatDates(date);
        }
    }
}
</script>

<style scoped>
    ul {
        list-style: disc !important;
        margin-left: 1rem;
    }

    .card {
        box-shadow: 0 2px 4px rgba(30, 60, 90, 0.1);
        border: none;
    }

    .card-columns {
        column-count: 4;
        color: #fff
    }

    .note {
        color: #696969;
        font-size: 0.8rem;
    }

    .current-status {
        border: 0.25rem solid #606062;
    }

    .card-header {
        background: #606062;
        padding-top: 0.5rem;
        padding-bottom: 0;
    }

    .emergency {
        background-color: #5900b3;
    }

    .red {
        background-color: #c00000;
    }

    .orange {
        background-color: #dc9601;
    }

    .yellow {
        background-color: #ffe699;
        color: #000;
    }

    .green {
        background-color: #73a73b;
    }

    .blue {
        background-color: #4472c4;
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

    @media (min-width: 480px) {
        .card {
            border-radius: 1rem;
            margin-top: 1.5rem;
        }
    }
</style>
