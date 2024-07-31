<template>
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
</template>

<script setup lang="ts">
import moment from 'moment'
import { useWeatherStore } from '@/stores/weather_store'

const weather = useWeatherStore()
</script>

<style scoped></style>
