<script>
import Card from '../components/Card.vue'
import Hero from '../components/Hero.vue'
import { mapActions, mapState } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  data() {
    return {
      currentPage: 1,
      searchKeyword: ''
    }
  },
  components: {
    Card,
    Hero
  },
  computed: {
    ...mapState(useCounterStore, ['products'])
  },
  methods: {
    ...mapActions(useCounterStore, ['fetchData', 'fetchCustomerProduct']),
    paginationHandler(value) {
      this.currentPage += value
      this.fetchData(this.currentPage, this.searchKeyword)
    },
  },
  created() {
    this.fetchData()
    this.fetchCustomerProduct()
  }
}
</script>

<template>
  <body id="top">
    <div class="overlay" data-overlay data-nav-toggler></div>

    <main>
      <article>
        <!-- 
        - #HERO
      -->

        <Hero />

        <!-- 
        - #PRODUCTS
      -->

        <section class="section product" id="product" aria-label="product">
          <div class="container">
            <div class="title-wrapper">
              <h2 class="h2 section-title">Popular Products</h2>

              <ul class="pagination justify-content-end " style="margin-top: ;">
                  <li v-if="currentPage !== 1" class="page-item">
                    <a class="page-link" href="#" aria-label="Previous" @click.prevent="paginationHandler(-1)">
                      <span aria-hidden="true">Previous</span>
                      <span class="sr-only">Previous</span>
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#" aria-label="Next" @click.prevent="paginationHandler(1)">
                      <span aria-hidden="true">Next</span>
                      <span class="sr-only">Next</span>
                    </a>
                  </li>
              </ul>
            </div>
            
            <ul class="grid-list product-list" data-filter="all">
              <Card class="shadow" v-for="product in products" :key="product.id" :product="product" />
            </ul>
           
          </div>
        </section>

        <section class="section blog" id="blog" aria-label="blog">
          <div class="container">
            <div class="title-wrapper">
              <h2 class="h2 section-title"> Our blog</h2>
            </div>

            <ul class="grid-list">
              <li>
                <div class="blog-card">
                  <div class="card-banner img-holder" style="--width: 374; --height: 243">
                    <img
                      src="https://cdn.shopify.com/s/files/1/2350/5189/files/4_Pieces_of_Living_Room_Furniture_You_Should_t_Be_Without_Article_1024x1024.jpg?v=1582602461"
                      width="374"
                      height="243"
                      loading="lazy"
                      alt="Unique products that will impress your home in 2022."
                      class="img-cover"
                    />

                    <a href="#" class="card-btn">
                      <span class="span">Read more</span>

                      <ion-icon name="add-outline" aria-hidden="true"></ion-icon>
                    </a>
                  </div>

                  <div class="card-content">
                    <h3 class="h3">
                      <a href="#" class="card-title"
                        >Best furniture in 2030</a
                      >
                    </h3>

                    <ul class="card-meta-list">
                      <li class="card-meta-item">
                        <time class="card-meta-text" datetime="2022-09-27">15 Mei, 2021</time>
                      </li>

                      <li class="card-meta-item">
                        <a href="#" class="card-meta-text">Admin</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>

              <li>
                <div class="blog-card">
                  <div class="card-banner img-holder" style="--width: 374; --height: 243">
                    <img
                      src="https://blog.smartfurniture.com/wp-content/uploads/2023/06/image-81.png"
                      width="374"
                      height="243"
                      loading="lazy"
                      alt="Navy Blue & White Striped Area Rugs"
                      class="img-cover"
                    />

                    <a href="#" class="card-btn">
                      <span class="span">Read more</span>

                      <ion-icon name="add-outline" aria-hidden="true"></ion-icon>
                    </a>
                  </div>

                  <div class="card-content">
                    <h3 class="h3">
                      <a href="#" class="card-title">New furniture by IKEA</a>
                    </h3>

                    <ul class="card-meta-list">
                      <li class="card-meta-item">
                        <time class="card-meta-text" datetime="2022-09-25">6 June, 2010</time>
                      </li>

                      <li class="card-meta-item">
                        <a href="#" class="card-meta-text">Admin</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>

              <li>
                <div class="blog-card">
                  <div class="card-banner img-holder" style="--width: 374; --height: 243">
                    <img
                      src="https://interiordesign.id/wp-content/uploads/2017/02/12-9.jpg"
                      width="374"
                      height="243"
                      loading="lazy"
                      alt="Woodex White Coated Staircase Floating"
                      class="img-cover"
                    />

                    <a href="#" class="card-btn">
                      <span class="span">Read more</span>

                      <ion-icon name="add-outline" aria-hidden="true"></ion-icon>
                    </a>
                  </div>

                  <div class="card-content">
                    <h3 class="h3">
                      <a href="#" class="card-title">Future furniture</a>
                    </h3>

                    <ul class="card-meta-list">
                      <li class="card-meta-item">
                        <time class="card-meta-text" datetime="2022-09-18">7 January, 2022</time>
                      </li>

                      <li class="card-meta-item">
                        <a href="#" class="card-meta-text">Admin</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </article>
    </main>


    <footer class="footer">
      <div class="container">
        <div class="footer-top section">
          <div class="footer-brand">
            <a href="#" class="logo">WoodRealm</a>

            <ul>
              <li class="footer-list-item">
                <ion-icon name="location-sharp" aria-hidden="true"></ion-icon>

                <address class="address">WoodRealm, Denpasar</address>
              </li>

              <li class="footer-list-item">
                <ion-icon name="call-sharp" aria-hidden="true"></ion-icon>

                <a href="tel:+1234567890" class="footer-link">+1234567890</a>
              </li>

              <li>
                <ul class="social-list">
                  <li>
                    <a href="#" class="social-link">
                      <ion-icon name="logo-facebook"></ion-icon>
                    </a>
                  </li>

                  <li>
                    <a href="#" class="social-link">
                      <ion-icon name="logo-twitter"></ion-icon>
                    </a>
                  </li>

                  <li>
                    <a href="#" class="social-link">
                      <ion-icon name="logo-tumblr"></ion-icon>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <ul class="footer-list">
            <li>
              <p class="footer-list-title">Help & Information</p>
            </li>

            <li>
              <a href="#" class="footer-link">Help & Contact Us</a>
            </li>

            <li>
              <a href="#" class="footer-link">Returns & Refunds</a>
            </li>

            <li>
              <a href="#" class="footer-link">Online Stores</a>
            </li>

            <li>
              <a href="#" class="footer-link">Terms & Conditions</a>
            </li>
          </ul>

          <ul class="footer-list">
            <li>
              <p class="footer-list-title">About Us</p>
            </li>

            <li>
              <a href="#" class="footer-link">About Us</a>
            </li>

            <li>
              <a href="#" class="footer-link">What We Do</a>
            </li>

            <li>
              <a href="#" class="footer-link">FAQ Page</a>
            </li>

            <li>
              <a href="#" class="footer-link">Contact Us</a>
            </li>
          </ul>

          <div class="footer-list">
            <p class="footer-list-title">Newsletter</p>

            <form action="" class="footer-form">
              <input
                type="email"
                name="email_address"
                placeholder="Your email address"
                required
                class="email-field"
              />

              <button type="submit" class="footer-form-btn">
                <ion-icon name="arrow-forward" aria-hidden="true"></ion-icon>
              </button>
            </form>

            <div class="wrapper">
              <a href="#" class="footer-link">Term & Condition</a>
              <a href="#" class="footer-link">Policy</a>
              <a href="#" class="footer-link">Map</a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  </body>
</template>

<style scoped>
  .pagination .page-link {
  font-size: 12px;
  padding: 10px 20px;
  font-weight: 500;
  color: black;
}
</style>
