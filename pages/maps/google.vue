<script lang="ts">
import CustomControl from "@/components/common/maps/google-maps/customControl.vue";
import Custommarker from "@/components/common/maps/google-maps/custommarker.vue";
import GoogleCircle from "@/components/common/maps/google-maps/googleCircle.vue";
import GoogleMarker from "@/components/common/maps/google-maps/googleMarker.vue";
import GooglePolygon from "@/components/common/maps/google-maps/googlePolygon.vue";
import GooglePolyline from "@/components/common/maps/google-maps/googlePolyline.vue";
import GoogleRectangle from "@/components/common/maps/google-maps/googleRectangle.vue";
import MarkerCluster from "@/components/common/maps/google-maps/markerCluster.vue";
import PageHeader from "@/components/common/pageheader.vue";
import GooglemapsCardComponent from "@/components/@spk/googlemaps-cards.vue"

export default {
  components: {
    PageHeader,
    GooglemapsCardComponent
  },

  data() {
    return {
      dataToPass: {
        current: "Google",
        list: ['Maps', 'Google']
      },
      mapTypes: [
        { title: 'Map With Marker', component: GoogleMarker },
        { title: 'Map with Rectangle', component: GoogleRectangle },
        { title: 'Map with Polygon', component: GooglePolygon },
        { title: 'Map With Polyline', component: GooglePolyline },
        { title: 'Map With MarkerCluster', component: MarkerCluster },
        { title: 'Map With Custom Marker', component: Custommarker },
        { title: 'Map With Circles', component: GoogleCircle },
        { title: 'Map With Custom Control', component: CustomControl }
      ],
    };
  }
};
</script>

<template>
  <PageHeader :propData="dataToPass" />

  <!-- Start::row-1 -->
  <div class="row">
    <div v-for="(map, index) in mapTypes" :key="index" class="col-xl-6">
      <GooglemapsCardComponent :title="map.title" :component="map.component" />
    </div>
  </div>
  <!-- End::row-1 -->
</template>

<style scoped></style>