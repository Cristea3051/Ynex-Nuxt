<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <!-- here -->
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">

const getImagePath = (imageName: any) => {
  const publicPath = import.meta.env.BASE_URL || '';
  return `${publicPath}${imageName}`;
}
useHead({
  title: ' YNEX - Nuxt3 Premium Admin & Dashboard Template ',
  link: [{ rel: 'icon', type: 'image/png', href: getImagePath('images/brand-logos/favicon.ico') }],
  meta: [
  {
      name: 'viewport',
      content: "width=device-width, initial-scale=1.0",
    },
    {
      name: 'keywords',
      content: "nuxt, nuxt dashboard, nuxt js admin panel, admin panel dashboard, admin dashboard ui, dash ui, dashboard user interface design, admin panel ui admin dashboard bootstrap, dashboard ui ux, ui admin, admin panel, bootstrap admin template, admin panel bootstrap, dashboard template",
    },
    // Add more meta tags as needed
  ],
})
</script>
<style>
.me-5 {
  margin-inline-end: 3rem !important;
}
</style>


<script lang="ts">
export default {
};
</script>