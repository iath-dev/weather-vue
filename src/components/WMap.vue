<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'
import { ref } from 'vue'
import { useWeatherStore } from '@/stores/weather_store'

const zoom = ref(12)

const weather = useWeatherStore()
</script>

<template>
  <section class="flex-1 rounded-lg" v-if="weather.location">
    <l-map
      ref="map"
      :min-zoom="6"
      :max-zoom="18"
      v-model:zoom="zoom"
      v-model:center="weather.location"
      :use-global-leaflet="false"
      @update:center="weather.update"
      class="w-full h-full rounded-lg"
    >
      <l-marker v-if="weather.location" :lat-lng="weather.location"> </l-marker>
      <l-tile-layer
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        layer-type="base"
        name="Stadia Maps Basemap"
      >
      </l-tile-layer>
      <div class="relative z-50 bottom-5 left-5">
        <p>Content</p>
      </div>
    </l-map>
  </section>
</template>
