<script lang="ts">
import PageHeader from "@/components/common/pageheader.vue";
import * as candleData from '@/data/apexcharts/apexchart-candlestick.js';

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
        current: "Apex Candlestick Charts",
        list: [
          'Charts', 'Apexcharts', 'Apex Candlestick Charts'
        ]
      },
      candleData,
      ApexCandlestickChart: [
        { id: 1, title: "Basic Candlestick Chart", type: "candlestick", height: "350", chart: { options: candleData.basicCandleoptions, series: candleData.basicCandleseries }, },
        { id: 2, title: "Candlestick Synced With Brush Chart", type: "", height: "170", secondaryheight: "20", chart: { options: candleData.syncedoptions, series: candleData.syncedseries, secondaryOptions: candleData.brushoptionsBar, secondarySeries: candleData.brushseries12 }, },
        { id: 3, title: "Candlestick With Cateory X-axis", type: "candlestick", height: "350", chart: { options: candleData.categoryoptions, series: candleData.categoryseries }, },
        { id: 'candlestick-line', title: "Candlestick With Line Chart", type: "candlestick", height: "350", chart: { options: candleData.lineCombooptions, series: candleData.lineComboseries }, }
      ],
    };
  },
};
</script>

<template>
  <PageHeader :propData="dataToPass" />

  <!-- Start::row-1 -->
  <div class="row">
    <div class="col-xl-6" v-for="card in ApexCandlestickChart" :key="card.id">
      <ChartCardComponent :card="card" :title="card.title" :id="card.id" />
    </div>
  </div>
  <!--End::row-1 -->
</template>

<style scoped></style>
