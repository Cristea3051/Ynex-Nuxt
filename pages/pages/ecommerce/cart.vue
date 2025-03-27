<script lang="ts">
import PageHeader from "@/components/common/pageheader.vue";
import Swal from 'sweetalert2';
import BasicCardComponent from "@/components/@spk/basic-cards.vue";
import png1 from "/images/ecommerce/png/1.png";
import png3 from "/images/ecommerce/png/3.png";
import png7 from "/images/ecommerce/png/7.png";
import png12 from "/images/ecommerce/png/12.png";
import png15 from "/images/ecommerce/png/15.png";
import SimpleCardComponent from "@/components/@spk/simple-card.vue";
import TableComponent from "@/components/@spk/tables/tables.vue"
export default {
  components: {
    PageHeader,
    BasicCardComponent,
    SimpleCardComponent,
    TableComponent
  },
  data() {
    return {
      dataToPass: {
        current: "Cart",
        list: ['Ecommerce', 'Cart'],
      },
      cartProducts: [
        { id: 1, name: 'Hiroma grey Hoodie (Unisex wear)', size: 'Large', color: 'Grey', price: 459, quantity: 2, image: png1, offer: 'In Offer', badgeColor: "success-transparent" },
        { id: 2, name: 'Blue Denim Jacket for Women', size: 'Medium', color: 'Blue', price: 129, quantity: 1, image: png7, offer: '25% discount', badgeColor: "info" },
        { id: 3, name: 'Orange smart watch(44mm dial)', size: '44mm dial', color: 'Bronze', price: 249, quantity: 2, image: png15, offer: 'On Offer', badgeColor: "success-transparent" },
        { id: 4, name: 'Sweater for winter', size: 'Medium', color: 'Light Pink', price: 249, quantity: 2, image: png12, offer: 'On Offer', badgeColor: "success-transparent" },
        { id: 5, name: 'Snow coat from denim Corporation', size: 'Large', color: 'Green', price: 1299, quantity: 1, image: png3, offer: null, badgeColor: null }
      ]
    };
  },
  methods: {
    increaseQuantity(index: number) {
      this.cartProducts[index].quantity++;
    },
    decreaseQuantity(index: number) {
      if (this.cartProducts[index].quantity > 1) {
        this.cartProducts[index].quantity--;
      }
    },
    confirmAlert(index: number) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.removeFromCart(index);
          Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
        }
      });
    },
    removeFromCart(index: number) {
      this.cartProducts.splice(index, 1);
    },
  },
};
</script>



<template>
  <PageHeader :propData="dataToPass" />

  <!-- Start::row-1 -->
  <div class="row">
    <div class="col-xxl-9">
      <SimpleCardComponent title="Cart Items">
        <TableComponent :headers="['Product Name', 'Price', 'Quantity', 'Total', 'Action']" :rows="cartProducts"
          tableClass="table table-bordered text-nowrap" v-slot:cell="{ row, index }" v-if="cartProducts.length">
          <td>
            <div class="d-flex align-items-center">
              <div class="me-3">
                <span class="avatar avatar-xxl bg-light">
                  <img :src="row.image" alt="">
                </span>
              </div>
              <div>
                <div class="mb-1 fs-14 fw-semibold">
                  <a href="javascript:void(0);">{{ row.name }}</a>
                </div>
                <div class="mb-1">
                  <span class="me-1">Size:</span>
                  <span class="fw-semibold text-muted">{{ row.size }}</span>
                </div>
                <div class="mb-1">
                  <span class="me-1">Color:</span>
                  <span class="fw-semibold text-muted">
                    {{ row.color }}
                    <span v-if="row.offer" :class="`badge bg-${row.badgeColor} ms-3`">{{ row.offer }}</span>
                  </span>
                </div>
              </div>
            </div>
          </td>
          <td>
            <div class="fw-semibold fs-14">${{ row.price.toFixed(2) }}</div>
          </td>
          <td class="product-quantity-container">
            <div class="input-group rounded flex-nowrap">
              <button
                class="btn btn-icon btn-light input-group-text flex-fill product-quantity-minus border-end-0 d-flex align-items-center"
                @click="decreaseQuantity(index)">
                <i class="ri-subtract-line"></i>
              </button>
              <input type="text" class="form-control form-control-sm text-center w-100" aria-label="quantity"
                :value="row.quantity" readonly>
              <button
                class="btn btn-icon btn-light input-group-text flex-fill product-quantity-plus border-start-0 d-flex align-items-center"
                @click="increaseQuantity(index)">
                <i class="ri-add-line"></i>
              </button>
            </div>
          </td>
          <td>
            <div class="fs-14 fw-semibold">
              ${{ (row.price * row.quantity).toFixed(2) }}
            </div>
          </td>
          <td>
            <router-link to="/pages/ecommerce/wishlist" class="btn btn-icon btn-success me-1" data-bs-toggle="tooltip"
              data-bs-placement="top" data-bs-title="Add To Wishlist">
              <i class="ri-heart-line"></i>
            </router-link>
            <button class="btn btn-icon btn-danger btn-delete" data-bs-toggle="tooltip" data-bs-placement="top"
              data-bs-title="Remove From cart" @click="confirmAlert(index)">
              <i class="ri-delete-bin-line"></i>
            </button>
          </td>
        </TableComponent>
        <div class="cart-empty text-center" v-if="cartProducts.length === 0">
          <svg xmlns="http://www.w3.org/2000/svg" class="svg-muted" width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M18.6 16.5H8.9c-.9 0-1.6-.6-1.9-1.4L4.8 6.7c0-.1 0-.3.1-.4.1-.1.2-.1.4-.1h17.1c.1 0 .3.1.4.2.1.1.1.3.1.4L20.5 15c-.2.8-1 1.5-1.9 1.5zM5.9 7.1 8 14.8c.1.4.5.8 1 .8h9.7c.5 0 .9-.3 1-.8l2.1-7.7H5.9z">
            </path>
            <path d="M6 10.9 3.7 2.5H1.3v-.9H4c.2 0 .4.1.4.3l2.4 8.7-.8.3zM8.1 18.8 6 11l.9-.3L9 18.5z"></path>
            <path
              d="M20.8 20.4h-.9V20c0-.7-.6-1.3-1.3-1.3H8.9c-.7 0-1.3.6-1.3 1.3v.5h-.9V20c0-1.2 1-2.2 2.2-2.2h9.7c1.2 0 2.2 1 2.2 2.2v.4z">
            </path>
            <path
              d="M8.9 22.2c-1.2 0-2.2-1-2.2-2.2s1-2.2 2.2-2.2c1.2 0 2.2 1 2.2 2.2s-1 2.2-2.2 2.2zm0-3.5c-.7 0-1.3.6-1.3 1.3 0 .7.6 1.3 1.3 1.3.8 0 1.3-.6 1.3-1.3 0-.7-.5-1.3-1.3-1.3zM18.6 22.2c-1.2 0-2.2-1-2.2-2.2s1-2.2 2.2-2.2c1.2 0 2.2 1 2.2 2.2s-.9 2.2-2.2 2.2zm0-3.5c-.8 0-1.3.6-1.3 1.3 0 .7.6 1.3 1.3 1.3.7 0 1.3-.6 1.3-1.3 0-.7-.5-1.3-1.3-1.3z">
            </path>
          </svg>
          <h3 class="fw-bold mb-1">Your Cart is Empty</h3>
          <h5 class="mb-3">Add some items to make me happy :)</h5>
          <a href="javascript:void(0);" class="btn btn-primary btn-wave m-3 waves-effect waves-light"
            data-abc="true">continue shopping
            <i class="bi bi-arrow-right ms-1"></i>
          </a>
        </div>
      </SimpleCardComponent>
    </div>

    <div class="col-xxl-3">
      <BasicCardComponent :showCardBody="true" cardBodyClass="p-0">
        <template v-slot:card>
          <div class="p-3 border-bottom d-block">
            <div class="alert alert-primary text-center" role="alert">
              <span class="text-default me-1">Sale Ends in</span>
              <vue-countdown :time="2 * 12 * 60 * 60 * 1000" v-slot="{ days, hours, minutes, seconds }">
                <span class="fw-semibold fs-14 text-primary ms-1 mx-1">{{ hours }}
                  Hours : {{ minutes }} Minutes: {{ seconds }} seconds</span>
              </vue-countdown>
            </div>
          </div>
        </template>
        <template v-slot:cardBody>
          <div class="p-3 border-bottom border-block-end-dashed">
            <p class="mb-2 fw-semibold text-default">Delivery:</p>
            <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
              <input type="radio" class="btn-check" name="btnradio" id="btnradio1">
              <label class="btn btn-outline-light text-default" for="btnradio1">Free Delivery</label>
              <input type="radio" class="btn-check" name="btnradio" id="btnradio2" checked>
              <label class="btn btn-outline-light text-default" for="btnradio2">Express Delivery</label>
            </div>
            <p class="mb-0 mt-2 fs-12 text-muted">Delivered by 24, Nov 2022</p>
          </div>
          <div class="p-3 border-bottom border-block-end-dashed">
            <div class="input-group mb-1">
              <input type="text" class="form-control form-control-sm" placeholder="Coupon Code" aria-label="coupon-code"
                aria-describedby="coupons">
              <button class="btn btn-primary input-group-text" id="coupons">Apply</button>
            </div>
            <a href="javascript:void(0);" class="fs-12 text-success">10% off on first purchase</a>
          </div>
          <div class="p-3 border-bottom border-block-end-dashed">
            <div class="d-flex align-items-center justify-content-between mb-3">
              <div class="text-muted op-7">Sub Total</div>
              <div class="fw-semibold fs-14 text-default">$1,299</div>
            </div>
            <div class="d-flex align-items-center justify-content-between mb-3">
              <div class="text-muted op-7">Discount</div>
              <div class="fw-semibold fs-14 text-success">10% - $129</div>
            </div>
            <div class="d-flex align-items-center justify-content-between mb-3">
              <div class="text-muted op-7">Delivery Charges</div>
              <div class="fw-semibold fs-14 text-danger">- $49</div>
            </div>
            <div class="d-flex align-items-center justify-content-between mb-3">
              <div class="text-muted op-7">Service Tax (18%)</div>
              <div class="fw-semibold fs-14 text-default">- $169</div>
            </div>
            <div class="d-flex align-items-center justify-content-between">
              <div class="text-muted op-7">Total :</div>
              <div class="fw-semibold fs-14 text-primary">$1,387</div>
            </div>
          </div>
          <div class="p-3 d-grid">
            <router-link to="/pages/ecommerce/checkout" class="btn btn-primary btn-wave mb-2">Proceed To
              Checkout</router-link>
            <router-link to="/pages/ecommerce/products" class="btn btn-light btn-wave">Continue Shopping</router-link>
          </div>
        </template>
      </BasicCardComponent>
    </div>
  </div>
  <!-- End::row-1 -->
</template>

<style scoped>
/* Add any specific styles here */
</style>
