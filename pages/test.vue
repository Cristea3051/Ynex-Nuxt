<template>
  <div>
    <h1>Data from Laravel API</h1>
    <ul>
      <!-- <li v-for="item in items" :key="item.id">{{ item.name }}</li> -->
    </ul>
  </div>
</template>

<!-- <script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import axios from 'axios'

export default defineComponent({
  data() {
    return {
      items: [] as any[]
    }
  },
  async mounted() {
    try {
      const response = await axios.get('http://example.com/api/items')
      this.items = response.data
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
})
</script>

<style scoped></style> -->
