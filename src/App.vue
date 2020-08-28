<template>
  <div id="app">
    <TheHeader/>
    <main id="main">
      <router-view/>
    </main>
    <TheFooter/>
  </div>
</template>

<script>
  import TheHeader from "./components/TheHeader.vue";
  import TheFooter from "./components/TheFooter.vue";

  export default {
    components: {
      TheHeader,
      TheFooter,
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
    background-color: #F0F8FF;
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
    flex: 1;
  }

  @media (min-width: 500px) {
    #app {
      margin-right: 5%;
      margin-left: 5%;
    }
  }
</style>
