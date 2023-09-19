<script>
import { mapActions, mapState } from 'pinia'
import { useCounterStore } from '../stores/counter'
export default{
  props:['product'],
  methods:{
    ...mapActions(useCounterStore, ['deleteProduct']),
    rupiah(number) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
      }).format(number)
    },
    doDelete(id){
      this.deleteProduct(id)
    }
  }
}
</script>

<template>
  <hr class="my-4" />

  <div class="row mb-4 d-flex justify-content-between align-items-center">
    <div class="col-md-2 col-lg-2 col-xl-2">
      <img
        :src="product.Product.imgUrl"
        class="img-fluid rounded-3"
        alt="Cotton T-shirt"
      />
    </div>
    <div class="col-md-3 col-lg-3 col-xl-3">
      <h6 class="text-black mb-0">{{ product.Product.name }}</h6>
    </div>

    <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
      <h6 class="mb-0">{{ rupiah(product.Product.price) }}</h6>
    </div>
    <div class="col-md-1 col-lg-1 col-xl-1 text-end">
      <a @click.prevent="doDelete(product.id)" href="#!" class="text-muted"><i class="fas fa-times"></i></a>
    </div>
  </div>
</template>
