<script lang="ts">
import PageHeader from "@/components/common/pageheader.vue";
import StarRating from 'vue-star-rating';

import { ratingConfigs } from "@/data/ratings.js";
import SimpleCardComponent from "@/components/@spk/cards/simple-cards.vue";

export default {
  setup() {
    definePageMeta({
      middleware: ["auth"],
    })

  },
  components: {
    PageHeader,
    StarRating,
    SimpleCardComponent
  },
  data() {
    return {
      dataToPass: {
        current: "Ratings",
        list: [
          'Advanced UI', 'Ratings'
        ]
      },
      resetableRating: 1,
      ratingConfigs
    };
  },
};
</script>

<template>
  <PageHeader :propData="dataToPass" />

  <!-- Start::row-1 -->
  <div class="row">
    <div v-for="(ratingConfig, index) in ratingConfigs" :key="index" :class="ratingConfig.colClass">
      <SimpleCardComponent :title="ratingConfig.title">
        <div class="d-flex flex-wrap align-items-center justify-content-between">
          <p class="fs-14 mb-0 fw-semibold">{{ ratingConfig.description }}</p>
          <star-rating v-bind="ratingConfig.starOptions" v-model:rating="ratingConfig.rating"></star-rating>
          <button v-if="ratingConfig.resetable" class="btn btn-icon btn-sm btn-danger-light ms-3"
            id="rater-reset-button" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Reset"
            @click="ratingConfig.rating = 0">
            <i class="ri-restart-line"></i>
          </button>
        </div>
      </SimpleCardComponent>
    </div>
  </div>
  <!--End::row-1 -->
</template>

<style scoped></style>
