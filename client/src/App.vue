<script>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import { mapActions } from 'pinia';
import { useCounterStore } from './stores/counter';
export default {
  components: {
    Navbar
  },
  data(){
    return{
      showNavbar: true
    }
  },
  watch: {
    $route(to) {
      this.showNavbar = !['/login', '/register'].includes(to.path);
    }
  },
  methods:{
    ...mapActions(useCounterStore, ['fetchCustomerProduct'])
  },
  created(){
    this.fetchCustomerProduct()
  }
}
</script>

<template>
  <Navbar v-if="showNavbar" style="position: fixed;"/> 
  <RouterView />
</template>

<style scoped></style>
