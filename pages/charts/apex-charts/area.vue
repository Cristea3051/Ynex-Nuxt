<script lang="ts">
import PageHeader from "@/components/common/pageheader.vue";
import * as areaData from "@/data/apexcharts/apexchart-area"
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
        current: "Apex Area Charts",
        list: [
          'Charts', 'Apexcharts', 'Apex Area Charts'
        ]
      },
      areaData,
      ApexAreaChart: [
        { id: 1, title: "Basic Area Chart", type: "area", height: "350", chart: { options: areaData.basicAreaChartOptions, series: areaData.basicAreaSeries }, },
        { id: 2, title: "Spline Area Chart", type: "area", height: "350", chart: { options: areaData.splineChartOptions, series: areaData.splineSeries }, },
        { id: 3, title: "Area Chart With Negative Values", type: "area", height: "350", chart: { options: areaData.AreaChartNegativeValueChartOptions, series: areaData.AreaChartNegativeValueSeries }, },
        { id: 4, title: "Selection-Github Style Chart", showGitImg: true, type: "area", height: "150", secondaryHeight: "150", chart: { options: areaData.GitHubStyleChartOptions, series: areaData.GitHubStyleSeries, secondaryOptions: areaData.GitHubStyleYearChartOptions, secondarySeries: areaData.GitHubStyleYearSeries }, },
        { id: 5, title: "Stacked Area Chart", cardBodyClass: "custom-chart-class", type: "area", height: "350", chart: { options: areaData.StackedAreaChartOptions, series: areaData.StackedAreaSeries }, },
        { id: 6, title: "Irregular Time Series Chart", cardBodyClass: "custom-chart-class", type: "area", height: "350", chart: { options: areaData.IrregularTimeChartOptions, series: areaData.IrregularTimeSeries }, },
        { id: 7, title: "Area Chart With Null Values", type: "area", height: "350", chart: { options: areaData.NullValuesChartOptions, series: areaData.NullValuesSeries }, },
        { id: 8, title: "Area Chart-Datetime X-Axis Chart", type: "area", height: "340", chart: { options: areaData.DateTimeChartOptions, series: areaData.DateTimeSeries }, btnGroup: true },
      ],
    };
  },
};
</script>

<template>
  <PageHeader :propData="dataToPass" />

  <!-- Start::row-1 -->
  <div class="row">
    <div class="col-xl-6" v-for="card in ApexAreaChart" :key="card.id">
      <ChartCardComponent :card="card" :title="card.title" :showGitImg="card.showGitImg"
        :cardBodyClass="card.cardBodyClass">
      </ChartCardComponent>
    </div>
  </div>
  <!--End::row-1 -->
</template>

<style scoped></style>
