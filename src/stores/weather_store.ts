import type { Forecast, ForecastResponse, WeatherResponse } from '@/models/response'
import axios from 'axios'
import { defineStore } from 'pinia'

interface LocationInfo {
  lat: number
  lng: number
}

export const useWeatherStore = defineStore('weather', {
  state: () => {
    return {
      isLoading: true,
      forecast: null as ForecastResponse | null,
      weather: null as WeatherResponse | null,
      location: null as LocationInfo | null
    }
  },
  getters: {
    weatherFormatted: (state) => {
      if (state.weather == null || state.forecast == null) return null

      return {
        city: state.forecast.city,
        ...state.weather.weather[0],
        icon: `http://openweathermap.org/img/wn/${state.weather.weather[0].icon}.png`,
        ...state.weather.main
      }
    },
    forecastFormatted: (state) =>
      state.forecast
        ? ({
            ...state.forecast,
            list: state.forecast!.list.map<Forecast>((el) => ({
              ...el,
              weather: el.weather.map((w) => ({
                ...w,
                icon: `http://openweathermap.org/img/wn/${w.icon}.png`
              }))
            }))
          } as ForecastResponse)
        : null
  },
  actions: {
    async fetchCoords() {
      try {
        if (navigator.geolocation) {
          const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject)
          })

          const { latitude, longitude } = pos.coords
          this.location = { lat: latitude, lng: longitude }
        }
      } catch (error) {
        console.error({ error })
      }
    },
    async fetchWeather() {
      if (!this.location) return

      try {
        const { lat, lng } = this.location

        const apiKey = import.meta.env.VITE_API_KEY
        const uri = `https://api.openweathermap.org/data/2.5/weather`
        const res = await axios.get<WeatherResponse>(uri, {
          params: {
            lat,
            lon: lng,
            appid: apiKey
          }
        })
        this.weather = res.data
      } catch (error) {
        console.error({ 'Fetch forecast error': error })
      }
    },
    async fetchForecast() {
      if (!this.location) return

      try {
        const { lat, lng } = this.location

        const apiKey = import.meta.env.VITE_API_KEY
        const uri = `https://api.openweathermap.org/data/2.5/forecast`
        const res = await axios.get<ForecastResponse>(uri, {
          params: {
            lat,
            lon: lng,
            appid: apiKey
          }
        })
        this.forecast = res.data
      } catch (error) {
        console.error({ 'Fetch forecast error': error })
      }
    },
    async data() {
      try {
        this.isLoading = true
        await Promise.all([this.fetchForecast(), this.fetchWeather()])
        this.isLoading = false
      } catch (error) {
        console.log(error)
      }
    },
    async init() {
      await this.fetchCoords()
      this.data()
    },
    update() {
      this.data()
    }
  }
})

// export const useWeatherStore = defineStore('weather', () => {
//   const isLoading = ref(true)
//   const forecast = ref<ForecastResponse | null>(null)
//   const weather = ref<WeatherResponse | null>()
//   const location = ref<{ lat: number; lng: number } | null>(null)

//   const fetchLocation = async () => {
//     try {
//       if (navigator.geolocation) {
//         const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
//           navigator.geolocation.getCurrentPosition(resolve, reject)
//         })

//         const { latitude, longitude } = pos.coords
//         location.value = { lat: latitude, lng: longitude }
//       }
//     } catch (error) {
//       console.error({ error })
//     }
//   }

//   const init = async () => {
//     await fetchLocation()
//     fetchData()
//   }

//   const update = () => {
//     fetchData()
//   }

//   const fetchData = async () => {
//     try {
//       isLoading.value = true

//       await Promise.all([fetchWeather(), fetchForecast()])

//       isLoading.value = false
//     } catch (error) {
//       console.log(fetchData.name, error)
//     }
//   }

//   const fetchWeather = async () => {
//     if (location.value == null) return

//     try {
//       const { lat, lng } = location.value
//       const apiKey = import.meta.env.VITE_API_KEY
//       const uri = `https://api.openweathermap.org/data/2.5/weather`
//       const response = await axios.get<WeatherResponse>(uri, {
//         params: {
//           lat,
//           lon: lng,
//           appid: apiKey
//         }
//       })
//       weather.value = response.data
//     } catch (error) {
//       console.log(fetchForecast.name, error)
//     }
//   }

//   const fetchForecast = async () => {
//     if (location.value == null) return

//     try {
//       const { lat, lng } = location.value
//       const apiKey = import.meta.env.VITE_API_KEY
//       const uri = `https://api.openweathermap.org/data/2.5/forecast`
//       const response = await axios.get<ForecastResponse>(uri, {
//         params: {
//           lat,
//           lon: lng,
//           appid: apiKey
//         }
//       })
//       forecast.value = response.data
//     } catch (error) {
//       console.log(fetchForecast.name, error)
//     }
//   }

//   const weatherFormatted = computed(() => {
//     if (weather.value == null || forecast.value == null) return null

//     return {
//       city: forecast.value.city,
//       ...weather.value.weather[0],
//       icon: `http://openweathermap.org/img/wn/${weather.value.weather[0].icon}.png`,
//       ...weather.value.main
//     }
//   })

//   const forecastFormatted = computed(() => {
//     if (forecast.value == null) return null

//     return {
//       ...forecast.value,
//       list: forecast.value!.list.map<Forecast>((el) => ({
//         ...el,
//         weather: el.weather.map((w) => ({
//           ...w,
//           icon: `http://openweathermap.org/img/wn/${w.icon}.png`
//         }))
//       }))
//     } as ForecastResponse
//   })

//   return { forecastFormatted, weatherFormatted, location, init, update, isLoading }
// })
