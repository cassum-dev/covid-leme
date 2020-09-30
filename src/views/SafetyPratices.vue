<template>
    <section>
        <b-card>
            <h4>Boas práticas de segurança</h4>
        </b-card>

        <b-card-group columns>
            <b-card>
                <h4>Lave as mãos frequentemente</h4>
                <p></p>
                Lave as mãos com água e sabão sempre que possível, principalmente ao preparar alimentos, quando precisar sair de casa ou entrar em contato com objetos de uso comum (maçanetas, botões de elevador, corrimãos, etc).
                <p></p>
                A limpeza das mãos quando efetuada corretamente rompe a membrana de gordura que reveste os vírus, fazendo com que esses percam muitas de suas funções básicas e "morram".
                <p></p>
                Para uma lavagem completa use sabão suficiente para que a espuma cubra completamente suas mãos, esfregando bem suas palmas, os espaços entre os dedos o dorso da mão e também os    punhos.
                <p></p>
                Caso esteja usando banheiro ou torneira público busque sempre lavar ela antes de ensaboar as mãos, ou use toalhas de papel para fechá-la, tais medidas evitam uma recontaminação após a lavagem das mãos.
            </b-card>

            <b-card>
                <h4>Fique em casa</h4>
                <p></p>
                A melhor proteção contra o coronavírus é, se possível, manter-se em casa, evitando contato com aglomerações e pessoas vindas de centros comerciais enquanto elas não realizarem a higienização das mãos e das máscaras.
                <p></p>
                A quarentena é o principal meio de combate a epidemia de coranavírus, pois ela reduz a taxa de contágio do vírus, conforme estudos realizados pelo Instituto Butantan no estado de São Paulo uma pessoa com Covid-19 contaminava até outras seis pessoas antes da quarentena, com tal número caindo para duas após o ínicio do isolamento social em massa.
            </b-card>

            <b-card>
                <h4>Cuidados ao frequentar estabelecimentos comerciais ou locais de uso público</h4>
                <p></p>
                Ao frequentar estabelecimentos comerciais ou locais públicos (parques, praças, templos religiosos, etc) busque fazê-lo em horários de menor movimento, reduzindo assim o risco da formação de aglomerações.
                <p></p>
                Considere que suas mãos podem estar sempre contaminadas, evitando levá-las em contato com a boca, o nariz, os olhos e a máscara. Higienize-as com água e sabão ou use álcool em gel 70% sempre que disponível.
                <p></p>
                Mantenha-se a uma distância de um a dois metros de distância de outras pessoas e nunca tire ou abaixe sua máscara, mesmo que em locais abertos e bem ventilados.
            </b-card>

            <b-card>
                <h4>Use máscara</h4>
                <p></p>
                O uso da máscara é essencial para aqueles que não podem ficar em isolamento social ou que precisam realizar tarefas fora de casa, como ir ao centro comercial, ao trabalho e ao mercado, se usadas devidamente elas proporcionam uma barreira que impede a contaminação por gotículas dispersas no ar.
                <p></p>
                Para que seu uso seja efetivo é preciso que a máscara cubra totalmente sua boca e o nariz, evite sempre tocar nela ou retirá-la em locais públicos. Ela é essencial mesmo em atividades físicas como caminhar, correr, andar de bicicleta ou em profissões que exigam uma carga física maior
                <p></p>
                Caso precise ficar de máscara durante longos períodos é recomendável que se realize a troca da mesma em particular a cada duas ou três horas, ou assim que se perceber que ela está ficando úmida, removendo-a pelas tiras de fixação e guardando-a em um recipiente ou embalagem selado, higienizando-a assim que possível.
                <p></p>
                As máscaras de tecido podem ser lavadas com água e sabão, além de também poderem ser deixadas de molho em uma solução de água e água sanitária (proporção de uma colher de sopa de água sanitária para cada litro de água).
                <p></p>
                Para a higienização de máscaras profisionais ou máscaras com filtros é recomendável se consultar o manual de limpeza (normalmente encontrado no verso da embalagem) ou entrar em contato com a fabricante da mesma, pois alguns métodos de lavagem podem comprometer seus materiais e sua efetividade.
            </b-card>

            <b-card>
                <h4>Cuidados ao voltar para casa</h4>
                <p></p>
                Ao voltar de casa busque sempre realizar uma limpeza completa das roupas que utilizou ao sair, evite entrar em contato com objetos não essenciais e entrar em casa com os sapatos, que podem ser higienizados com água e sabão ou com álcool 70%.
                <p></p>
                Caso tenha feito compras limpe as embalagens com um pano umidificado com água e detergente ou álcool 70%, limpe támbem as maçanetas do carro e a área do guidão e da manete da moto ou bicicleta.
                <p></p>
                Para finalizar a higienização tome um bom banho antes de entrar em contato direto com outras pessoas que residam junto.
            </b-card>
        </b-card-group>
    </section>
</template>

<script>
export default {

}
</script>

<style scoped>
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
