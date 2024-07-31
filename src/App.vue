<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import ForecastList from '@/components/ForecastList.vue'
import WMap from '@/components/WMap.vue'
import { onMounted } from 'vue'
import { useWeatherStore } from '@/stores/weather_store'

const weather = useWeatherStore()

onMounted(() => {
  weather.init()
})
</script>

<template>
  <main
    v-if="weather.isLoading"
    class="container flex flex-col w-screen h-screen mx-auto space-y-4"
  >
    <div class="h-24 rounded-b-lg bg-slate-100 animate-pulse"></div>
    <div class="flex-1 rounded-lg bg-slate-100 animate-pulse"></div>
    <div class="h-24 rounded-t-lg bg-slate-100 animate-pulse"></div>
  </main>
  <main v-else class="container flex flex-col w-screen h-screen gap-4 px-4 mx-auto">
    <AppHeader></AppHeader>
    <WMap></WMap>
    <ForecastList></ForecastList>
  </main>
</template>

<style scoped></style>
