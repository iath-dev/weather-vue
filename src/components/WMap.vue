<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'
import { weatherStore } from '@/stores/weather_store'
import { onBeforeMount, ref } from 'vue';

const zoom = ref(12)

const weather = weatherStore()

onBeforeMount(() => {
  weather.onStart()
})
</script>

<template>
  <section class="row-span-3 rounded-lg">
    <l-map
      ref="map"
      v-model:zoom="zoom"
      :min-zoom="6"
      :max-zoom="18"
      v-model:center="weather.currentLocation"
      :use-global-leaflet="false"
      class="w-full h-full rounded-lg"
    >
      <!-- <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer> -->
      <l-marker v-if="weather.currentLocation !== null" :lat-lng="weather.currentLocation">
      </l-marker>
      <l-tile-layer
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        layer-type="base"
        name="Stadia Maps Basemap"
      >
      </l-tile-layer>
    </l-map>
  </section>
</template>
