<template>
  <header>
    <div>
      <b-navbar toggleable="lg" type="light" class="nav-bar">
        <b-navbar-brand class="logo" to="/">COVID LEME</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>

            <b-navbar-nav>
              <b-nav-item href="/commerce-stages">
                Estágios do Comércio
              </b-nav-item>
              <!-- <b-nav-item disabled>
                Informações do Estágio Atual
              </b-nav-item> -->
              <b-nav-item href="/safety-pratices">
                Boas Práticas de Segurança
              </b-nav-item>
            </b-navbar-nav>

          <!-- <b-navbar-nav class="ml-auto">
            <b-nav-item>
              <router-link to="/" class="logo">
                <img src="../assets/logo.png" alt="VueLogo">
              </router-link>
            </b-nav-item>
          </b-navbar-nav> -->
        </b-collapse>
      </b-navbar>
    </div>
  </header>
</template>

<script>
export default {
  name: "TheHeader"
}
</script>

<style scoped>
.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  box-shadow: 0 2px 4px rgba(30, 60, 90, 0.1);
  flex-direction: row;
  background-color: #fff;
}

.logo img {
  width: 60px;
}

.logo {
  font-weight: bold;
}

@media (min-width: 500px) {
  .nav-bar {
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
  }
}
</style>