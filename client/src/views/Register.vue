<script>
import { mapActions, mapState } from 'pinia'
import { useCounterStore } from '../stores/counter'
export default {
  data() {
    return {
      inputRegis: {
        username: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions(useCounterStore, ['doRegister']),
    regis(){
      this.doRegister(this.inputRegis)
    }
  }
}
</script>

<template>
  <div class="login-page">
    <transition name="fade">
      <div v-if="!registerActive" class="wallpaper-login"></div>
    </transition>
    <div class="wallpaper-register"></div>
    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-md-6 col-sm-8 mx-auto divnya" style="height:">
          <div class="card register shadow custom-card" v-bind:class="{ error: emptyFields }">
            <h1 class="mb-4">Sign Up</h1>
            <form class="form-group">
              <input
                v-model="inputRegis.username"
                type="text"
                class="form-control mb-4"
                placeholder="Username"
                required
              />
              <input
                v-model="inputRegis.email"
                type="email"
                class="form-control mb-4"
                placeholder="Email"
                required
              />
              <input
                v-model="inputRegis.password"
                type="password"
                class="form-control mb-4"
                placeholder="Password"
                required
              />
              <input type="submit" class="btn btn-primary mb-3" @click.prevent="regis" />
              <a style="cursor: pointer;" @click.prevent="this.$router.push('/login')">Already have an account?</a>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.custom-card {
  border-radius: 15px; 
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3); 
}
</style>
