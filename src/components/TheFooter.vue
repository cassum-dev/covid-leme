<template>
    <footer>
    <p>Cassum Web Development</p>
    </footer>
</template>

<script>
    export default {
        name: "TheFooter"
    }
</script>

<style scoped>
    footer {
        background: #42b983;
        padding: 25px 0;
        text-align: center;
        font-size: 1.2rem;
        color: #fff;
        position: relative;
        top: 2rem;
    }

    @media (min-width: 500px) {
        footer {
            border-top-left-radius: 1rem;
            border-top-right-radius: 1rem;
        }
    }
</style>