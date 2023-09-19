import axios from 'axios'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    baseUrl: 'https://zahra.ninoambara.tech',
    products: [],
    productById: [],
    hasAccessToken: false,
    customerProduct: [],
    discountCodeApplied: false,
    discountAmount: 0,
    validDiscountCode: 'akucintatugasini'
  }),
  getters: {},
  actions: {
    async fetchData(pagination, filter) {
      try {
        const { data } = await axios({
          url: this.baseUrl + '/product',
          method: 'get',
          params: {
            filter: filter,
            page: pagination
          }
        })
        this.products = data.data
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: `${error.response.data.message}`,
          icon: 'error',
          confirmButtonText: 'Okay'
        })
      }
    },
    async doLogin(input) {
      try {
        const { data } = await axios({
          url: this.baseUrl + '/login',
          method: 'post',
          data: input
        })

        this.router.push('/')
        localStorage.access_token = data.access_token
        localStorage.email = data.email
        this.hasAccessToken = true
        Swal.fire('Good job!', 'Login success!', 'success')
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: `${error.response.data.message}`,
          icon: 'error',
          confirmButtonText: 'Okay'
        })
      }
    },
    async doRegister(input) {
      try {
        const { data } = await axios({
          url: this.baseUrl + '/register',
          method: 'post',
          data: input
        })
        this.router.push('/login')
        Swal.fire('Good job!', 'Register success!', 'success')
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: `${error.response.data.message}`,
          icon: 'error',
          confirmButtonText: 'Okay'
        })
      }
    },
    async fetchDataById(id) {
      try {
        const { data } = await axios({
          url: this.baseUrl + '/product/' + id,
          method: 'get'
        })

        this.productById = data
        this.router.push(`/product/${id}`)
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: `${error.response.data.message}`,
          icon: 'error',
          confirmButtonText: 'Okay'
        })
      }
    },
    async fetchCustomerProduct() {
      try {
        const { data } = await axios({
          url: this.baseUrl + '/myproducts',
          method: 'get',
          headers: {
            access_token: localStorage.access_token
          }
        })

        this.customerProduct = data
      } catch (error) {
        // Swal.fire({
        //   title: 'Error!',
        //   text: `${error.response.data.message}`,
        //   icon: 'error',
        //   confirmButtonText: 'Okay'
        // })
      }
    },
    async deleteProduct(id) {
      try {
        const { data } = await axios({
          url: this.baseUrl + '/myproducts/' + id,
          method: 'delete',
          headers: {
            access_token: localStorage.access_token
          }
        })

        Swal.fire('Good job!', 'Product deleted success!', 'success')
        this.fetchCustomerProduct()
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: `${error.response.data.message}`,
          icon: 'error',
          confirmButtonText: 'Okay'
        })
      }
    },
    async addMyProduct(id) {
      try {
        const { data } = await axios({
          url: this.baseUrl + '/myproducts/' + id,
          method: 'post',
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.fetchCustomerProduct()
        Swal.fire('Good job!', 'Product added success!', 'success')
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: `${error.response.data.message}`,
          icon: 'error',
          confirmButtonText: 'Okay'
        })
      }
    },
    async createInvoice() {
      try {
        const { data } = await axios({
          method: 'get',
          url: this.baseUrl + '/generatepdf',
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.fetchCustomerProduct()
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: `${error.response.data.message}`,
          icon: 'error',
          confirmButtonText: 'Okay'
        })
      }
    },
    async midtransMethod() {
      try {
        this.createInvoice()
        const { data } = await axios({
          method: 'post',
          url: this.baseUrl + '/generate-midtrans',
          headers: {
            access_token: localStorage.access_token
          }
        })
        window.open(data, '_blank')
        this.router.push('/')
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: `${error.response.data.message}`,
          icon: 'error',
          confirmButtonText: 'Okay'
        })
      }
    }
  }
})
