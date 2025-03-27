<script lang="ts">
import PageHeader from "@/components/common/pageheader.vue";
import * as bubbleData from '@/data/apexcharts/apexchart-bubble.js';

import ChartCardComponent from "@/components/@spk/dashboard/chart-cards.vue";

export default {
  setup() {
    definePageMeta({
      middleware: ["auth"],
    })

  },
  components: {
    PageHeader,
    ChartCardComponent,
  },
  data() {
    return {
      dataToPass: {
        current: "Apex Bubble Charts",
        list: [
          'Charts', 'Apexcharts', 'Apex Bubble Charts'
        ]
      },
      bubbleData,
      ApexBubbleChart: [
        { id: 1, title: "Simple Bubble Chart", type: "", height: "350", chart: { options: bubbleData.Chartoptions, series: bubbleData.series }, },
        { id: 2, title: "3D Bubble Chart", type: "", height: "350", chart: { options: bubbleData.bubble3DChartoptions, series: bubbleData.bubble3Dseries }, },
      ],
    };
  },
};
</script>

<template>
  <PageHeader :propData="dataToPass" />

  <!-- Start::row-1 -->
  <div class="row">
    <div class="col-xl-6" v-for="card in ApexBubbleChart" :key="card.id">
      <ChartCardComponent :card="card" :title="card.title" />
    </div>
  </div>
  <!--End::row-1 -->
</template>

<style scoped></style>
