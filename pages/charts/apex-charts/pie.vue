<script lang="ts">
import PageHeader from "@/components/common/pageheader.vue";
import * as pieData from '@/data/apexcharts/apexchart-pie.js';

import ChartCardComponent from "@/components/@spk/dashboard/chart-cards.vue";

export default {
  setup() {
    definePageMeta({
      middleware: ["auth"],
    })

  },
  components: {
    PageHeader,
    ChartCardComponent
  },
  data() {
    return {
      dataToPass: {
        current: "Apex Pie Charts",
        list: [
          'Charts', 'Apexcharts', 'Apex Pie Charts'
        ]
      },
      pieData,
      ApexPieChart: [
        { id: 1, title: "Basic Pie Chart", type: "pie", height: "300", chart: { options: pieData.basicPieoptions, series: pieData.basicPieseries }, },
        { id: 2, title: "Simple Donut Chart", type: "donut", height: "300", chart: { options: pieData.simpleoptions, series: pieData.simpleseries }, },
        { id: 3, title: "Updating Donut Chart", type: "pie", height: "300", chart: { options: pieData.updatingoptions, series: pieData.updatingseries }, },
        { id: 4, title: "Monochrome Pie Chart", type: "pie", height: "280", chart: { options: pieData.monochromeoptions, series: pieData.monochromeseries }, },
        { id: 5, title: "Gradient Donut Chart", type: "donut", height: "300", chart: { options: pieData.graidnetoptions, series: pieData.graidnetseries }, },
        { id: 6, title: "Donut Chart With Patterns", type: "pie", height: "260", chart: { options: pieData.patternedoptions, series: pieData.patternedseries }, },
        { id: 7, title: "Image Filled Pie Chart", type: "pie", height: "300", chart: { options: pieData.imageoptions, series: pieData.imageseries }, },
      ],
    };
  },
};
</script>

<template>
  <PageHeader :propData="dataToPass" />

  <!-- Start::row-1 -->
  <div class="row">
    <div class="col-xl-6" v-for="card in ApexPieChart" :key="card.id">
      <ChartCardComponent :card="card" :title="card.title" />
    </div>
  </div>
  <!--End::row-1 -->
</template>

<style scoped></style>
