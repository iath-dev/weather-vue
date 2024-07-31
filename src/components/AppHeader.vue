<template>
  <div class="flex justify-center space-x-6 item-center">
    <div v-if="weather.weatherFormatted" class="flex items-center justify-center py-2 space-x-4">
      <img :src="weather.weatherFormatted.icon" :alt="weather.weatherFormatted.description" />
      <div class="flex flex-col">
        <span class="text-lg font-semibold text-primary">{{
          weather.weatherFormatted.city.name
        }}</span>
        <p class="text-sm font-tight" data-testid="weather-temp">
          {{ weather.weatherFormatted.temp }} &deg;F
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWeatherStore } from '@/stores/weather_store'

const weather = useWeatherStore()
</script>

<style scoped></style>
