<script lang="ts">
import PageHeader from "@/components/common/pageheader.vue";
import * as lineData from '@/data/apexcharts/apexchart-line.js'

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
        current: "Apex Line Charts",
        list: [
          'Charts', 'Apexcharts', 'Apex Line Charts'
        ]
      },
      lineData,
      ApexLineChart: [
        { id: 1, title: "Basic Line Chart", type: "line", height: "350", chart: { options: lineData.basicoptions, series: lineData.basicseries } },
        { id: 2, title: "Line Chart With Data Labels", type: "line", height: "350", chart: { options: lineData.datalabelsoptions, series: lineData.datalabelsseries } },
        { id: 3, title: "Zoomable Time Series", type: "area", height: "350", chart: { options: lineData.timeoptions, series: lineData.timeseries } },
        { id: 4, title: "Line With Annotations", type: "line", height: "350", chart: { options: lineData.annotationsoptions, series: lineData.annotationsseries } },
        { id: 5, title: "Brush Chart", type1: "area", type: "line", height: "175", chart: { options: lineData.brushoptions, series: lineData.brushseries, secondaryOptions: lineData.brush1options, secondarySeries: lineData.brush1series } },
        { id: 6, title: "StepLine Chart", type: "line", height: "364", chart: { options: lineData.steplineoptions, series: lineData.steplineseries } },
        { id: 7, title: "Gradient Line Chart", type: "line", height: "350", chart: { options: lineData.gradientoptions, series: lineData.gradientseries } },
        { id: 8, title: "Missing/Null Values Chart", type: "line", height: "350", chart: { options: lineData.missingoptions, series: lineData.missingseries } },
        { id: 9, title: "Real Time Chart", type: "line", height: "350", chart: { options: lineData.realtimeoptions, series: lineData.realtimeseries } },
        { id: 10, title: "Dashed Line Chart", type: "line", height: "350", chart: { options: lineData.dashedoptions, series: lineData.dashedseries } },
        { id: 11, title: "Syncing Charts", height: "166", chart: { options: lineData.syncingoptions, series: lineData.syncingseries, secondaryOptions: lineData.syncing1options, secondarySeries: lineData.syncing1series, tertiaryOptions: lineData.syncing2options, tertiarySeries: lineData.syncing2series } }
      ],
    };
  },
  methods: {

    getRandomArbitrary(min: number, max: number) {
      return Math.floor(Math.random() * 99);
    },
    setDataLineChart() {
      const intervalId = setInterval(() => {
        // this.getNewSeries(this.realtimeseries[0].data, {
        //   min: 10,
        //   max: 90
        // });
      }, 3000);

      // Add the intervalId to the cleanup function
      onUnmounted(() => {
        clearInterval(intervalId);
      });
    },
  },
  mounted() {
    this.setDataLineChart();
  },
};
</script>

<template>
  <PageHeader :propData="dataToPass" />

  <!-- Start::row-1 -->
  <div class="row">
    <div class="col-xl-6" v-for="card in ApexLineChart" :key="card.id">
      <ChartCardComponent :card="card" :title="card.title" />
    </div>
  </div>
  <!--End::row-1 -->
</template>

<style scoped></style>
