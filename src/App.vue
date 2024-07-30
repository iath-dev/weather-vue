<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
// import TheWelcome from './components/TheWelcome.vue'
// import 'leaflet/dist/leaflet.css'
// import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'
import { onBeforeMount, ref } from 'vue'
import { weatherStore } from './stores/weather_store'
import WMap from '@/components/WMap.vue'

const zoom = ref(12)

const weather = weatherStore()

onBeforeMount(() => {
  weather.onStart()
})
</script>

<template>
  <main class="container grid w-screen h-screen gap-4 mx-auto grid-row-4">
    <WMap></WMap>
    <!-- <section class="row-span-3 rounded-lg">
      <l-map
        ref="map"
        v-model:zoom="zoom"
        :min-zoom="6"
        :max-zoom="18"
        v-model:center="weather.currentLocation"
        :use-global-leaflet="false"
        class="w-full h-full rounded-lg"
      >
        <l-marker v-if="weather.currentLocation !== null" :lat-lng="weather.currentLocation">
        </l-marker>
        <l-tile-layer
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
          layer-type="base"
          name="Stadia Maps Basemap"
        >
        </l-tile-layer>
      </l-map>
    </section> -->
    <section class="bg-secondary">
      <!-- <div v-for="cast in weather.forecast"></div> -->
    </section>
  </main>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <TheWelcome />
  </main> -->
</template>

<style scoped>
/* header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
} */
</style>
