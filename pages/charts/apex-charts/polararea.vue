<script lang="ts">
import PageHeader from "@/components/common/pageheader.vue";
import * as polarareaData from '@/data/apexcharts/apexchart-polararea.js';

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
        current: "Apex Polar Area Charts",
        list: [
          'Charts', 'Apexcharts', 'Apex Polar Area Charts'
        ]
      },
      polarareaData,
      ApexPolarChart: [
        { id: 1, title: "Basic Polar Area Chart", type: "polarArea", height: "350", chart: { options: polarareaData.basicoptions, series: polarareaData.basicseries }, },
        { id: 2, title: "Polar Area Monochrome Chart", type: "polarArea", height: "350", chart: { options: polarareaData.monochromeoptions, series: polarareaData.monochromeseries }, },
      ],
    };
  },
};
</script>

<template>
  <PageHeader :propData="dataToPass" />

  <!-- Start::row-1 -->
  <div class="row">
    <div class="col-xl-6" v-for="card in ApexPolarChart" :key="card.id">
      <ChartCardComponent :card="card" :title="card.title" />
    </div>
  </div>
  <!--End::row-1 -->
</template>

<style scoped></style>
