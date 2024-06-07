<script>
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
	export default {
    name: 'AppHome',
    setup() {
      const store = useStore()
      const router = useRouter()
      let pages = store.getters.pages
      const logout = async () => {
          try {
              await store.dispatch('logout')
              router.replace({ name: 'login' })
          }
          catch (error) {
              // handleErrors(error)
          }
      }
      return {pages, logout}
    }
	}
</script>
<template>
  <div class="container">
    <nav class="navbar is-transparent">
      <div class="navbar-brand">
        <a class="navbar-item" href="#">
          <img src="../assets/logoJuanito.png" alt="Mi Logo">
        </a>
        <div class="navbar-burger js-burger" data-target="navbarExampleTransparentExample">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div id="navbarExampleTransparentExample" class="navbar-menu">
        <div class="navbar-start">
          <router-link v-for="page in pages" :key="page" :to="page.name_component" class="navbar-item">{{ page.name }}</router-link>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="field is-grouped">
              <p class="control">
                <a class="button is-primary" @click="logout">
                  <span class="icon">
                    <i class="fas fa-power-off"></i>
                  </span>
                  <span>Cerrar</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <section class="hero is-info is-fullheight">
      <div class="hero-body">
        <router-view name="sidebar"></router-view>
      </div>
    </section>
  </div>
</template>