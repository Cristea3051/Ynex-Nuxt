<script lang="ts">
import PageHeader from "@/components/common/pageheader.vue";
import { DoughnutChart, LineChart, BarChart, ScatterChart, BubbleChart, RadarChart, PolarAreaChart, PieChart } from 'vue-chart-3';
import * as chartjsData from "@/data/chartjs/chartjs.js";
import ChartjsCardComponent from "@/components/@spk/charts/chartjs-cards.vue"

export default {
  components: {
    PageHeader, DoughnutChart, LineChart, BarChart, ScatterChart, BubbleChart, RadarChart, PolarAreaChart, PieChart,
    ChartjsCardComponent
  },
  data() {
    return {
      dataToPass: {
        current: "ChartJs Charts",
        list: [
          'Charts', 'ChartJs Charts'
        ]
      },
      chartjsData,
      chartjs: [
        { type: LineChart, title: 'Chartjs Line Chart', data: chartjsData.linedata },
        { type: BarChart, title: 'Chartjs Bar Chart', data: chartjsData.bardata },
        { type: PieChart, title: 'Chartjs Pie Chart', data: chartjsData.singledata },
        { type: DoughnutChart, title: 'Chartjs Doughnut Chart', data: chartjsData.singledata },
        { type: PolarAreaChart, title: 'Chartjs Polar Chart', data: chartjsData.singledata2 },
        { type: RadarChart, title: 'Chartjs Radial Chart', data: chartjsData.radialdata },
        { type: ScatterChart, title: 'Chartjs Scatter Chart', data: chartjsData.scatterdata },
        { type: BubbleChart, title: 'Chartjs Bubble Chart', data: chartjsData.Bubbledata },
      ],
    };
  },
};
</script>

<template>
  <PageHeader :propData="dataToPass" />

  <!-- Start::row-1 -->
  <!-- Start::row-1 -->
  <div class="row">
    <div v-for="(card, index) in chartjs" :key="index" class="col-xl-6">
      <ChartjsCardComponent :title="card.title" :type="card.type" :data="card.data" />
    </div>
  </div>
  <!--End::row-1 -->
</template>

<style scoped></style>
