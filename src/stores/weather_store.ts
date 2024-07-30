import type { ForecastResponse } from '@/models/response'
import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const weatherStore = defineStore('weather', () => {
  const forecast = ref<ForecastResponse | null>(null)
  const currentLocation = ref<number[] | null>([0, 0])

  const getLocation: PositionCallback = (pos) => {
    currentLocation.value = [pos.coords.latitude, pos.coords.longitude]
  }

  const getForecast = async () => {
    if (currentLocation.value == null) return null

    const [lat, lon] = currentLocation.value
    const uri = `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}`
    const response = await axios.get<ForecastResponse>(uri)

    console.log(response)

    return response.data
  }

  const updateForecast = async () => {
    // forecast.value = await getForecast()
  }

  const onStart = async () => {
    navigator.geolocation.getCurrentPosition(getLocation, console.error)

    // updateForecast()
  }

  return { forecast, currentLocation, onStart, updateForecast }
})
