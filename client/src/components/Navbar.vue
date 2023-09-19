<script>
import { mapActions, mapState, mapWritableState } from 'pinia'
import { useCounterStore } from '../stores/counter'
import Card from '../components/Card.vue'

export default {
  data() {
    return {
      currentPage: 1,
      searchKeyword: '',
      isLoggedin: false
    }
  },
  components: {
    Card
  },
  computed: {
    ...mapState(useCounterStore, ['products','customerProduct']),
    ...mapWritableState(useCounterStore, ['hasAccessToken']),
    isDetailPage() {
      return this.$route.path.includes('/detail/:id')
    }
  },
  methods: {
    ...mapActions(useCounterStore, ['fetchData', 'fetchCustomerProduct']),
    performSearchAndFetch() {
      this.currentPage = 1
      this.fetchData(this.currentPage, this.searchKeyword)
    },
    doLogout() {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Logout'
      }).then((result) => {
        if (result.isConfirmed) {
          this.email = ''
          localStorage.clear()
          this.$router.push('/login')
        }
      })
    },
    checkAccount() {
      Swal.fire(`you are currently logged with ${localStorage.email}`)
    },
    getProductLength() {
      const lengthProduct = this.customerProduct.length
      return lengthProduct
    },
  },
  created() {
    if (localStorage.getItem('access_token')) {
      this.hasAccessToken = true
    }
    this.fetchCustomerProduct()
  }
}
</script>

<template>
  <header class="header" data-header>
    <div class="container">
      <div class="input-wrapper">
        <input
          v-model="searchKeyword"
          @input="performSearchAndFetch"
          type="search"
          name="search"
          placeholder="Search Anything..."
          class="input-field"
        />

        <ion-icon name="search-outline" aria-hidden="true"></ion-icon>
      </div>

      <a @click.prevent="this.$router.push('/')" href="#" class="logo">WoodRealm</a>

      <div class="header-action">
        <button
          v-if="hasAccessToken === false"
          @click.prevent="this.$router.push('/login')"
          class="header-action-btn"
          aria-label="user"
        >
          <ion-icon name="person-outline" aria-hidden="true"></ion-icon>
        </button>

        <button
          v-if="hasAccessToken === true"
          @click="checkAccount()"
          class="header-action-btn"
          aria-label="user"
        >
          <ion-icon name="person-outline" aria-hidden="true"></ion-icon>
        </button>

        <button
          class="header-action-btn"
          aria-label="cart"
          @click.prevent="this.$router.push('/cart')"
        >
          <ion-icon name="bag-handle-outline" aria-hidden="true"></ion-icon>

          <span class="btn-badge">{{ getProductLength() }}</span>
        </button>

        <button
          v-if="hasAccessToken === true"
          @click.prevent="doLogout"
          class="header-action-btn"
          aria-label="open menu"
          data-nav-toggler
        >
          <ion-icon name="log-out-outline"></ion-icon>
        </button>
      </div>
    </div>
  </header>
</template>
