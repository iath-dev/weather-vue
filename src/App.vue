<script setup lang="ts">
import { useWeatherStore } from './stores/weather_store'
import WMap from '@/components/WMap.vue'
import { onMounted } from 'vue'
import moment from 'moment'

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
    <div class="flex justify-center space-x-6 item-center">
      <div v-if="weather.weatherFormatted" class="flex items-center justify-center py-2 space-x-4">
        <img :src="weather.weatherFormatted.icon" :alt="weather.weatherFormatted.description" />
        <div class="flex flex-col">
          <span class="text-lg font-semibold text-primary">{{
            weather.weatherFormatted.city.name
          }}</span>
          <p class="text-sm font-tight">
            {{ weather.weatherFormatted.temp }}
            <span class="font-semibold text-primary"> &deg;F </span>
          </p>
        </div>
      </div>
    </div>
    <WMap></WMap>
    <section
      v-if="weather.forecastFormatted != null && !weather.isLoading"
      class="flex max-h-screen pb-2 space-x-4 overflow-y-auto"
    >
      <div
        v-for="cast in weather.forecastFormatted!.list"
        :key="cast.dt"
        class="flex flex-col items-center justify-center p-6 space-y-2 rounded-lg shadow min-w-40 min-h-40 hover:shadow-lg aspect-square hover:bg-secondary/75"
      >
        <div class="flex items-center justify-around space-x-2">
          <img :src="cast.weather[0].icon" :alt="cast.weather[0].description" />
          <span class="font-bold text-md text-primary">{{ cast.weather[0].main }}</span>
        </div>
        <div>
          <h1 class="text-lg font-bold">
            {{ moment(cast.dt_txt).format('DD-MM-YY') }}
          </h1>
          <h1 class="text-sm font-bold text-primary">
            {{ moment(cast.dt_txt).format('HH:mm:ss') }}
          </h1>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped></style>
