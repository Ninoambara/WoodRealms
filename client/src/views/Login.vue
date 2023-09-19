<script>
import {mapActions} from 'pinia'
import {useCounterStore} from "../stores/counter"
export default {
  data() {
    return {
        inputLogin: {
            email: '',
            password: ''
        }
    }
  },
  methods: {
    ...mapActions(useCounterStore, ['doLogin']),
      login() {
        this.doLogin(this.inputLogin)
      },
      
      doRegister() {

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
        <div class="col-lg-4 col-md-6 col-sm-8 mx-auto divnya" style="height: ;">
          <div v-if="!registerActive" class="card login shadow custom-card" v-bind:class="{ error: emptyFields }">
            <h1 class="mb-4">Sign In</h1>
            <form class="form-group rounded">
              <input
                v-model="inputLogin.email"
                type="email"
                class="form-control mb-4"
                placeholder="Email"
                required
              />
              <input
                v-model="inputLogin.password"
                type="password"
                class="form-control mb-4"
                placeholder="Password"
                required
              />
              <!-- <button type="button" class="btn btn-primary mb-4" @click="doLogin">Login</button> -->
              <input type="submit" class="btn btn-primary mb-4" @click.prevent="login" />

              <router-link class="mb-4" to="/register">Sign up here</router-link>
              <!-- <p class="mb-4"><a href="#">Forgot your password?</a></p> -->
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-card {
  border-radius: 15px; 
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3); 
}
</style>


