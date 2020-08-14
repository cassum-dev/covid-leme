<template>
  <div id="app">
    <TheHeader/>
    <main id="main">
      <router-view/>
    </main>
      <LineChart/>
    <TheFooter/>
  </div>
</template>

<script>
  import TheHeader from "./components/TheHeader.vue";
  import TheFooter from "./components/TheFooter.vue";
  import LineChart from "./components/LineChart.vue";

  export default {
    components: {
      TheHeader,
      TheFooter,
      LineChart
    }
  };
</script>

<style>
  * {
    box-sizing: border-box;
  }

  body,
  ul,
  li,
  h1,
  h2 {
    padding: 0;
    margin: 0;
  }

  ul {
    list-style: none;
  }

  body {
    font-family: "Helvetica", Arial, Helvetica, sans-serif;
    color: #345;
  }

  a {
    color: #345;
    text-decoration: none;
  }

  img {
    max-width: 100%;
    /*display: block;*/
  }

  #app {
    display: flex;
    min-height: 100vh;
    flex-direction: column;

  }

  #main {
    flex: 1
  }
</style>
