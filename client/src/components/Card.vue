<script>
import { mapActions, mapState } from 'pinia'
import { useCounterStore } from '../stores/counter'
export default {
  props: ['product'],
  computed:{
    ...mapState(useCounterStore, ['productById', 'hasAccessToken'])
  },  
  methods: {
    ...mapActions(useCounterStore, ['fetchDataById', 'addMyProduct', 'fetchCustomerProduct']),
    doDetail(id){
      this.fetchDataById(id)
    },
    rupiah(number) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
      }).format(number)
    },
    addProduct(id){
      this.fetchCustomerProduct()
      this.addMyProduct(id)
    }
  }
}
</script>

<template>
  <li class="accessory">
    <div class="product-card">
      <a href="#" class="card-banner img-holder has-before" style="--width: 300; --height: 300">
        <img
          :src="product.imgUrl"
          width="300"
          height="300"
          loading="lazy"
          alt="Animi Dolor Pariatur"
          class="img-cover"
        />

        <ul class="card-action-list">
          <li>
            <button @click.prevent="doDetail(product.id)" class="card-action-btn" aria-label="see detail" title="see detail">
              <ion-icon name="aperture-outline"></ion-icon>
            </button>
          </li>

          <li>
            <button v-if="hasAccessToken === true" @click.prevent="addProduct(product.id)" class="card-action-btn" aria-label="add to cart" title="add to cart">
              <ion-icon name="bag-handle-outline" aria-hidden="true"></ion-icon>
            </button>
          </li>
        </ul>
      </a>

      <div class="card-content">
        <h3 class="h3">
          <a href="#" class="card-title">{{ product.name }}</a>
        </h3>

        <div class="card-price">
          <!-- <del class="del">RP.{{ product.price }}</del> -->

          <data class="price" :value="product.price">{{ rupiah(product.price) }}</data>
        </div>
      </div>
    </div>
  </li>
</template>
