<script>
import CardItem from '../components/cartitem.vue'
import { mapActions, mapState, mapWritableState } from 'pinia'
import { useCounterStore } from '../stores/counter'
export default {
  data() {
    return {
      discountCode: ''
    }
  },
  components: {
    CardItem
  },
  computed: {
    ...mapState(useCounterStore, ['customerProduct', 'validDiscountCode']),
    ...mapWritableState(useCounterStore, ['discountCodeApplied', 'discountAmount'])
  },
  methods: {
    ...mapActions(useCounterStore, [
      'fetchCustomerProduct',
      'deleteProduct',
      'createInvoice',
      'midtransMethod'
    ]),
    getProductLength() {
      const lengthProduct = this.customerProduct.length
      return lengthProduct
    },
    getTotalPrice() {
      let totalPrice = 0
      this.customerProduct.forEach((product) => {
        totalPrice += product.Product.price
      })
      return totalPrice
    },
    rupiah(number) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
      }).format(number)
    },
    applyDiscountCode(code) {
      if (code === this.validDiscountCode) {
        this.discountCodeApplied = true
        this.discountAmount = 100000
      } else {
        this.discountCodeApplied = false
        this.discountAmount = 0
      }
    },

    calculateTotalPrice() {
      let totalPrice = this.getTotalPrice()
      if (this.discountCodeApplied) {
        totalPrice -= this.discountAmount
      }
      return totalPrice
    },

    createPdf() {
      this.createInvoice()
      this.$router.push('/')
      Swal.fire('Good job!', 'success!', 'success')
    }
  },
  created() {
    this.fetchCustomerProduct()
  }
}
</script>

<template>
  <br /><br /><br /><br />
  <section class="h-100 h-custom" style="background-color: white">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12">
          <div
            class="card card-registration card-registration-2 shadow custom-card"
            style="border-radius: 15px"
          >
            <div class="card-body p-0">
              <div class="row g-0">
                <div class="col-lg-8">
                  <div class="p-5">
                    <div class="d-flex justify-content-between align-items-center mb-5">
                      <h1 class="fw-bold mb-0 text-black">Shopping Cart</h1>
                      <h6 class="mb-0 text-muted"></h6>
                    </div>

                    <CardItem
                      v-for="(product, index) in customerProduct"
                      :key="index"
                      :product="product"
                    />

                    <hr class="my-4" />

                    <div class="pt-5">
                      <h6 class="mb-0">
                        <a href="#!" class="text-body" @click.prevent="this.$router.push('/')"
                          ><i class="fas fa-long-arrow-alt-left me-2"></i>Back to shop</a
                        >
                      </h6>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 bg-grey">
                  <div class="p-5">
                    <h3 class="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                    <hr class="my-4" />

                    <div class="d-flex justify-content-between mb-4">
                      <h5 class="text-uppercase">items {{ getProductLength() }}</h5>
                      <h5>{{ rupiah(getTotalPrice()) }}</h5>
                    </div>

                    <div class="mb-5">
                      <div class="form-outline">
                        <label class="form-label" for="form3Examplea2">Enter your Voucher</label>
                        <input
                          type="text"
                          id="form3Examplea2"
                          class="form-control form-control-lg"
                          v-model="discountCode"
                        />
                        <button
                          class="btn btn-primary mt-2"
                          @click="applyDiscountCode(discountCode)"
                        >
                          Apply Code
                        </button>
                      </div>
                    </div>

                    <hr class="my-4" />

                    <div class="d-flex justify-content-between mb-5">
                      <h5 class="text-uppercase">Total price</h5>
                      <h5>{{ rupiah(calculateTotalPrice()) }}</h5>
                    </div>

                    <!-- <button
                      @click.prevent="this.createPdf"
                      type="button"
                      class="btn btn-dark btn-block btn-lg"
                      data-mdb-ripple-color="dark"
                    >
                      Checkout
                    </button> -->
                    <button
                      @click.prevent="this.midtransMethod"
                      type="button"
                      class="btn btn-dark btn-block btn-lg"
                      data-mdb-ripple-color="dark"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.custom-card {
  border-radius: 15px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
}
@media (min-width: 1025px) {
  .h-custom {
    height: 100vh !important;
  }
}

.card-registration .select-input.form-control[readonly]:not([disabled]) {
  font-size: 1rem;
  line-height: 2.15;
  padding-left: 0.75em;
  padding-right: 0.75em;
}

.card-registration .select-arrow {
  top: 13px;
}

.bg-grey {
  background-color: #eae8e8;
}

@media (min-width: 992px) {
  .card-registration-2 .bg-grey {
    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;
  }
}

@media (max-width: 991px) {
  .card-registration-2 .bg-grey {
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
  }
}
</style>
