import dayjs from "dayjs"
import { defineNuxtPlugin } from "#app"

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("formatDate", (value) => {
    const date = dayjs(value)
    return date.format("YYYY.M.D(ddd.)")
  })
})
