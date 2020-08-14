<template>
    <section>
        <h1>Covid Leme</h1>
        <h4>Última atualização em {{ lastUpdatedDate }}</h4>
    </section>
</template>

<script>
    import CovidData from '../datasources/covid.json';

    export default {
        name: "Home",
        computed: {
            lastUpdatedDate: function() {
                let lastDay = CovidData.find(element => element.is_last == true);

                return lastDay.date;
            }
        }
    }
</script>

<style scoped>

</style>
