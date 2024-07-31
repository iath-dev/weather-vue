import { mockForecast } from '@/assets/data/forecast'
import { mockWeather } from '@/assets/data/weather'
import type { ForecastResponse, WeatherResponse } from '@/models/response'
import { useWeatherStore } from '@/stores/weather_store'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import ForecastList from '@/components/ForecastList.vue'

describe('ForecastList', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('Render component', () => {
    const store = useWeatherStore()

    store.$patch({
      isLoading: false,
      location: { lat: 0, lng: 0 },
      forecast: mockForecast as ForecastResponse,
      weather: mockWeather as WeatherResponse
    })

    const wrapper = mount(ForecastList)

    expect(wrapper.text()).not.toBeNull()
  })

  it('Render list', () => {
    const store = useWeatherStore()

    store.$patch({
      isLoading: false,
      location: { lat: 0, lng: 0 },
      forecast: mockForecast as ForecastResponse,
      weather: mockWeather as WeatherResponse
    })

    const wrapper = mount(ForecastList)

    expect(wrapper.findAll('img').length).toBe(mockForecast.list.length)
  })

  it('Render component null', () => {
    const store = useWeatherStore()

    store.$patch({
      isLoading: false,
      location: { lat: 0, lng: 0 },
      forecast: null,
      weather: null
    })

    const wrapper = mount(ForecastList)

    expect(wrapper.text()).toBe('')
  })
})
