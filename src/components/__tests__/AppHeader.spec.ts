import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import AppHeader from '@/components/AppHeader.vue'
import { useWeatherStore } from '@/stores/weather_store'
import { mockForecast } from '@/assets/data/forecast'
import { mockWeather } from '@/assets/data/weather'
import type { ForecastResponse, WeatherResponse } from '@/models/response'
import { createPinia, setActivePinia } from 'pinia'
import { render, screen } from '@testing-library/vue'
import { mount } from '@vue/test-utils'

describe('AppHeaderComponent', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('render component', () => {
    const store = useWeatherStore()

    store.$patch({
      isLoading: false,
      location: { lat: 0, lng: 0 },
      forecast: mockForecast as ForecastResponse,
      weather: mockWeather as WeatherResponse
    })

    const wrapper = mount(AppHeader)

    expect(wrapper.text()).not.toBeNull()
  })

  it('render temperature content', () => {
    const store = useWeatherStore()

    store.$patch({
      isLoading: false,
      location: { lat: 0, lng: 0 },
      forecast: mockForecast as ForecastResponse,
      weather: mockWeather as WeatherResponse
    })

    const wrapper = mount(AppHeader)
    expect(wrapper.text()).toContain(mockWeather.main.temp)
  })

  it('render null', () => {
    const store = useWeatherStore()

    store.$patch({
      isLoading: false,
      location: { lat: 0, lng: 0 },
      forecast: null,
      weather: null
    })

    const wrapper = mount(AppHeader)
    expect(wrapper.text()).not.toContain(mockWeather.main.temp)
  })
})
