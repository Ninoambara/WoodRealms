<script>
import { mapActions, mapState } from 'pinia'
import { useCounterStore } from '../stores/counter'
export default {
  computed: {
    ...mapState(useCounterStore, ['productById', 'hasAccessToken'])
  },
  methods: {
    ...mapActions(useCounterStore, ['fetchDataById', 'addMyProduct', 'fetchCustomerProduct']),
    rupiah(number) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
      }).format(number)
    },
    addProduct(id) {
      this.fetchCustomerProduct()
      this.addMyProduct(id)
    }
  },
  created() {
    this.fetchDataById(this.$route.params.id)
  }
}
</script>

<template>
  <section class="vh-100" style="background-color: white; border-color: rgb(230, 187, 130)">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-12 col-xl-11">
          <div
            class="card text-black shadow-lg p-3 mb-5 bg-white rounded"
            style="border-radius: 25px"
          >
            <div class="card-body p-md-5">
              <div class="row justify-content-center">
                <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1 shadow">
                  <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                    {{ productById.name }}
                  </p>
                  <h2 class="mb-3">Description:</h2>
                  <p style="line-height: 1.5">{{ productById.description }}</p>
                  <h3 class="text-danger">Price: {{ rupiah(productById.price) }}</h3>
                  <button
                    v-if="hasAccessToken === true"
                    @click.prevent="addProduct(productById.id)"
                    class="btn btn-danger mt-3"
                  >
                    Add to cart
                  </button>
                  <div class="pt-5">
                    <h6 class="mb-0">
                      <a href="#!" class="text-body" @click.prevent="this.$router.push('/')"
                        ><i class="fas fa-long-arrow-alt-left me-2"></i>Back to shop</a
                      >
                    </h6>
                  </div>
                </div>
                <div
                  class="col-md-10 col-lg-6 col-xl-7 d-flex justify-content-end order-1 order-lg-2"
                >
                  <img
                    :src="productById.imgUrl"
                    class="img-fluid shadow-lg p-3 mb-5 bg-white rounded image"
                    alt="Sample image"
                    style="height: 350px"
                    @mouseenter="animateImage"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.product-detail-container {
  margin-top: 150px;
  z-index: 2;
}
.card {
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}
.image {
  height: 350px;
  object-fit: cover;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s;
}

.image:hover {
  transform: scale(1.05);
}

h1 {
  color: #333;
}

h2,
h3 {
  color: #555;
}

p {
  color: #777;
  line-height: 1.6;
}

.text-danger {
  color: #e74c3c;
}


</style>
