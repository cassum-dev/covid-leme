<template>
  <header>
    <nav>
      <h3>COVID LEME</h3>

      <ul class="nav-menu">
        <li class="nav-menu-item">
          Histórico de Estágios do comércio
        </li>
        <li class="nav-menu-item">
          Informações do Estágio Atual
        </li>
        <li class="nav-menu-item">
          Boas Práticas de Segurança
        </li>
      </ul>

      <router-link to="/" class="logo">
        <img src="../assets/logo.png" alt="VueLogo">
      </router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: "TheHeader"
}
</script>

<style scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  box-shadow: 0 2px 4px rgba(30, 60, 90, 0.1);
  flex-direction: row;
}

.logo {
  padding: 10px 0;
}

.logo img {
  width: 60px;
}

.nav-menu {
  justify-content: space-between;
  margin-left: auto;
  display: flex;
  flex-direction: row;
  flex-grow: 0.1;
}
</style>